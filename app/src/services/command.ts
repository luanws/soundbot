import { api } from "../utils/api"

export namespace CommandService {
    export async function showText(text: string): Promise<void> {
        await api.post('/command/show_text', { text })
    }
}