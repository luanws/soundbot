declare global {
    interface String {
        digits(): string
        replaceDiacritics(): string
        like(s: string): boolean
    }
}

String.prototype.digits = function () {
    return this.match(/\d/g)?.join('') || ''
}

String.prototype.replaceDiacritics = function () {
    return this.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

String.prototype.like = function (s: string) {
    return this.replaceDiacritics().toLowerCase().includes(s.replaceDiacritics().toLowerCase())
}

export { }

