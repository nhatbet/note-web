export function extractFirstImageUrl(markdownContent: string): string|null {
    // Regular Expression để tìm URL của ảnh trong cú pháp Markdown
    const regex = /!\[.*?\]\((.*?)\)/g

    // Tìm tất cả các match với URL ảnh
    const matches = [...markdownContent.matchAll(regex)]

    // Trả về URL ảnh đầu tiên nếu có
    return matches.length > 0 ? matches[0][1] : null
}
