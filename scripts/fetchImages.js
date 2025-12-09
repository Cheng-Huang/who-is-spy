import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOCAB_PATH = path.join(__dirname, '../src/data/vocabulary.json');
const IMAGE_DIR = path.join(__dirname, '../public/images/vocab');

// Ensure image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Load vocabulary
const vocabulary = JSON.parse(fs.readFileSync(VOCAB_PATH, 'utf-8'));

const BATCH_SIZE = 3000; // Process all pairs
let processedCount = 0;

const downloadImage = async (url, filepath) => {
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 10000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });

    // Verify content type
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.startsWith('image')) {
        throw new Error(`Invalid content type: ${contentType}`);
    }

    // Verify size (min 1KB)
    if (response.data.length < 1024) {
        throw new Error(`Image too small: ${response.data.length} bytes`);
    }

    fs.writeFileSync(filepath, response.data);
};

const fetchBingImage = (word) => {
    // Bing Image Thumbnail URL
    // mkt=zh-CN ensures Chinese context
    return `https://tse2.mm.bing.net/th?q=${encodeURIComponent(word)}&w=400&h=400&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=zh-CN&adlt=moderate`;
};

const processWord = async (item, type) => {
    const word = item[type];
    const imageField = `${type}Image`;
    const filename = `${item.id}_${type}.jpg`;
    const localPath = `/images/vocab/${filename}`;
    const fullPath = path.join(IMAGE_DIR, filename);

    // Skip if already has image and file exists
    if (item[imageField] && fs.existsSync(fullPath)) {
        return false;
    }

    console.log(`Downloading image for [${word}]...`);
    const imageUrl = fetchBingImage(word);

    let retries = 3;
    while (retries > 0) {
        try {
            await downloadImage(imageUrl, fullPath);
            item[imageField] = localPath;
            console.log(`✅ Saved ${word}`);
            return true;
        } catch (err) {
            console.error(`❌ Failed ${word}: ${err.message}`);
            retries--;
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    return false;
};

const run = async () => {
    console.log(`Starting Bing image download for max ${BATCH_SIZE} pairs...`);
    let changed = false;
    let pairsProcessed = 0;

    for (const item of vocabulary) {
        if (pairsProcessed >= BATCH_SIZE) break;

        // Check if this pair needs processing
        const needsCivilian = !item.civilianImage || !fs.existsSync(path.join(IMAGE_DIR, `${item.id}_civilian.jpg`));
        const needsSpy = !item.spyImage || !fs.existsSync(path.join(IMAGE_DIR, `${item.id}_spy.jpg`));

        if (!needsCivilian && !needsSpy) continue;

        const cSuccess = await processWord(item, 'civilian');
        await new Promise(r => setTimeout(r, 500)); // 0.5s delay is enough for Bing

        const sSuccess = await processWord(item, 'spy');
        await new Promise(r => setTimeout(r, 500));

        if (cSuccess || sSuccess) {
            changed = true;
        }

        pairsProcessed++;
    }

    if (changed) {
        fs.writeFileSync(VOCAB_PATH, JSON.stringify(vocabulary, null, 2), 'utf-8');
        console.log("Vocabulary updated with new images.");
    } else {
        console.log("No changes made.");
    }
    console.log(`Processed ${pairsProcessed} pairs.`);
};

run();
