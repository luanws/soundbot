declare global {
    interface String {
        digits(): string
        removeDiacritics(): string
        includesLike(s: string): boolean
        removeSpellingPoints(): string
        simplify(): string
    }
}

String.prototype.digits = function () {
    return this.match(/\d/g)?.join('') || ''
}

String.prototype.removeDiacritics = function () {
    return this.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

String.prototype.removeSpellingPoints = function () {
    return this.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
}

String.prototype.simplify = function () {
    return this
        .removeDiacritics()
        .removeSpellingPoints()
        .toLowerCase()
        .trim()
}

String.prototype.includesLike = function (s: string) {
    return this.simplify().includes(s.simplify())
}

export { }

