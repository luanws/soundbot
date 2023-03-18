import { api } from "../utils/api"

export namespace CommandService {
    export async function showText(text: string): Promise<void> {
        await api.post('/command/show_text', { text })
    }

    export async function hideText(): Promise<void> {
        await api.post('/command/hide_text')
    }

    export async function playVideo(params: { dirname: string, filename: string }): Promise<void> {
        await api.post('/command/play_video', params)
    }

    export async function stopVideo(): Promise<void> {
        await api.post('/command/stop_video')
    }

    export async function showHTML(html: string): Promise<void> {
        await api.post('/command/show_html', { html })
    }

    export async function hideHTML(): Promise<void> {
        await api.post('/command/hide_html')
    }
}