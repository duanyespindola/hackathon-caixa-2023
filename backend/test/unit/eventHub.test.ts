import myJson from '../feature/resp-example.json'
import { EventHub } from '@app/eventHub'

describe('EventHub', () => {
    test('Deve registrar um evento', async () => {
        const hub = new EventHub()
        expect(await hub.send(myJson)).toBe(true)
    }, 10 * 1000)
})