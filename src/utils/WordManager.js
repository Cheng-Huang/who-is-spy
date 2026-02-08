import vocabulary from '../data/vocabulary.json';

const STORAGE_KEY = 'who_is_spy_used_words';

class WordManager {
    constructor() {
        this.vocabulary = vocabulary;
        this.usedWordIds = this.loadUsedWords();
    }

    loadUsedWords() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load used words:', e);
            return [];
        }
    }

    saveUsedWords() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.usedWordIds));
        } catch (e) {
            console.error('Failed to save used words:', e);
        }
    }

    getUnusedWord() {
        // Return the first unused word in the vocabulary array (document order).
        // This makes word selection deterministic and consistent with the JSON order.
        const nextWord = this.vocabulary.find(word => !this.usedWordIds.includes(word.id));
        return nextWord ?? null;
    }

    markAsUsed(id) {
        if (!this.usedWordIds.includes(id)) {
            this.usedWordIds.push(id);
            this.saveUsedWords();
        }
    }

    resetHistory() {
        this.usedWordIds = [];
        this.saveUsedWords();
    }

    getProgress() {
        return {
            total: this.vocabulary.length,
            used: this.usedWordIds.length,
            remaining: this.vocabulary.length - this.usedWordIds.length
        };
    }
}

export const wordManager = new WordManager();
