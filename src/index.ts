import axios from 'axios';
import https from 'https';
import { Maniiifest } from 'maniiifest';

const urls = [
    // cookbook manifests/collections
    'https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0002-mvm-audio/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0003-mvm-video/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0004-canvas-size/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0005-image-service/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0006-text-language/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0118-multivalue/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0007-string-formats/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0029-metadata-anywhere/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0008-rights/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0009-book-1/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0011-book-3-behavior/manifest-continuous.json',
    'https://iiif.io/api/cookbook/recipe/0299-region/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0010-book-2-viewing-direction/manifest-rtl.json',
    'https://iiif.io/api/cookbook/recipe/0283-missing-image/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0117-add-image-thumbnail/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0232-image-thumbnail-canvas/manifest-av.json',
    'https://iiif.io/api/cookbook/recipe/0013-placeholderCanvas/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0014-accompanyingcanvas/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0202-start-canvas/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0015-start/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0230-navdate/navdate-collection.json',
    'https://iiif.io/api/cookbook/recipe/0154-geo-extension/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0240-navPlace-on-canvases/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0234-provider/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0032-collection/collection.json',
    'https://iiif.io/api/cookbook/recipe/0017-transcription-av/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0219-using-caption-file/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0046-rendering/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0017-transcription-av/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0219-using-caption-file/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0266-full-canvas-annotation/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0019-html-in-annotations/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0021-tagging/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/manifest.json',
    // 'https://iiif.io/api/cookbook/recipe/0022-linking-with-a-hotspot/manifest.json', // https://github.com/jptmoore/maniiifest/issues/4
    'https://iiif.io/api/cookbook/recipe/0326-annotating-image-layer/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0135-annotating-point-in-canvas/manifest.json',
    // 'https://iiif.io/api/cookbook/recipe/0139-geolocate-canvas-fragment/manifest.json', // https://github.com/jptmoore/maniiifest/issues/5
    'https://iiif.io/api/cookbook/recipe/0269-embedded-or-referenced-annotations/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0306-linking-annotations-to-manifests/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0377-image-in-annotation/manifest.json',
    // 'https://iiif.io/api/cookbook/recipe/0346-multilingual-annotation-body/manifest.json', // https://github.com/jptmoore/maniiifest/issues/6
    'https://iiif.io/api/cookbook/recipe/0024-book-4-toc/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0026-toc-opera/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0030-multi-volume/collection.json',
    'https://iiif.io/api/cookbook/recipe/0031-bound-multivolume/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0033-choice/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0035-foldouts/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0036-composition-from-multiple-images/manifest.json',
    // 'https://iiif.io/api/cookbook/recipe/0040-image-rotation-service/manifest-service.json', // https://github.com/jptmoore/maniiifest/issues/4
    'https://iiif.io/api/cookbook/recipe/0047-homepage/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0053-seeAlso/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0434-choice-av/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0064-opera-one-canvas/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0065-opera-multiple-canvases/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0068-newspaper/newspaper_title-collection.json',
    'https://iiif.io/api/cookbook/recipe/0074-multiple-language-captions/manifest.json',
    'https://iiif.io/api/cookbook/recipe/0318-navPlace-navDate/collection.json',

    // manifests/collections in the wild
    'https://iiif.wellcomecollection.org/presentation/b19974760',
    // 'https://t-pen.org/TPEN/manifest/2483?version=3' // https://github.com/jptmoore/maniiifest/issues/1
];

async function parseJsonFromUrls(urls: string[]) {
    for (const url of urls) {
        try {
            const response = await axios.get(url, {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            const data = new Maniiifest(response.data);
            const specType = data.getSpecificationType();
            let id;
            if (specType === 'Manifest') {
                id = data.getManifestId();
            } else if (specType === 'Collection') {
                id = data.getCollectionId();
            } else {
                throw new Error(`Unknown specification type: ${specType}`);
            }
            if (id === url) {
                console.log(`${specType} => ${url}`);
            } else {
                throw new Error(`ID does not match URL for ${url}: ${id}`);
            }
        } catch (error) {
            console.error(`Error fetching or parsing data from ${url}:`, error);
        }
    }
}

parseJsonFromUrls(urls);