
import sql from "mssql"
import dotenv from "dotenv";
dotenv.config();

export class Database {
    private config: sql.config = {
        server: process.env.DB_SERVER ?? 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) ?? 1433,
        database: process.env.DB_NAME,
    }
    private conn: sql.ConnectionPool | null = null;
    private static instance: Database;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect() {
        if (this.conn) return
        try {
            this.conn = await sql.connect(this.config)
        } catch (error) {
            this.conn = null;
            console.error('Erro ao conectar ao banco de dados', error);
            throw new Error("Erro ao conectar ao banco de dados");
        }
    }

    public get connected(): boolean {
        return !!this.conn
    }

    public async getAll(): Promise<sql.IRecordSet<any> | null> {
        if (!this.conn) {
            return null
        };
        const res = await this.conn.query`select * from dbo.PRODUTO`;
        return res.recordset;
    }

    public async findProduct(value: number, months: number): Promise<sql.IRecordSet<any> | null> {
        if (!this.conn) {
            return null
        };
        const res = await this.conn.query`
        SELECT * FROM dbo.PRODUTO
        WHERE    ( VR_MINIMO <= ${value} OR VR_MINIMO IS NULL) 
             AND ( VR_MAXIMO >= ${value} OR VR_MAXIMO IS NULL)
             AND ( NU_MINIMO_MESES <= ${months} OR NU_MINIMO_MESES IS NULL )
             AND ( NU_MAXIMO_MESES >= ${months} OR NU_MAXIMO_MESES IS NULL )
        `;
        return res.recordset;
    }
}

