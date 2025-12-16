// Simulation of the backend AI services
// This mocks the API calls described in the Technical Requirements

const DELAY_MS = {
    ANALYSIS: 1500,
    TRY_ON: 2500,
    ANGLES: 2000,
    VIDEO_SCENARIO: 2000,
    VIDEO_GEN: 3000
};

// Mock Data
const MOCK_ANALYSIS = {
    "product_id": "prod_12345",
    "category": "jacket",
    "primary_color": "beige",
    "style": "smart_casual",
    "material": "linen",
    "features": ["notch lapel", "two-button closure", "patch pockets"],
    "season_suitability": "spring/summer"
};

const MOCK_ANGLES_DESC = {
    "ID:1": "Change the angle to a low-angle three-quarter shot. Camera positioned at waist height, 45 degrees to the model's left side. The beige linen blazer's texture is visible with soft highlights. Trousers are captured showing the full leg line and natural drape. Background fades to soft gray. Composition emphasizes the silhouette.",
    "ID:2": "Change the angle to an overhead perspective. Camera directly above the model who is centered in frame. The blazer's lapel and shoulder seam details are prominent. Top-down view reveals the fit across the shoulders. Dramatic shadows cast downward. This angle showcases garment construction.",
    "ID:3": "Change the angle to a tight detail shot. Camera at chest level, focusing on the blazer's fabric weave and buttons. Shallow depth of field blurs the background. Lighting creates subtle texture in the linen. This intimate angle highlights material quality.",
    "ID:4": "Change the angle to a wide environmental shot. Camera pulled back 15 feet, capturing the full figure from head to toe with significant negative space. Model positioned in lower third of frame. The complete outfit silhouette is visible against the urban background.",
    "ID:5": "Change the angle to a dynamic side profile. Camera at eye level, 90 degrees perpendicular to the model. Captures the clean line from collar down through the torso. Side lighting creates definition between garment layers. This angle emphasizes the outfit's profile."
};

const MOCK_SCENARIOS = {
    "ID:1": {
        title: "URBAN CONFIDENCE",
        duration: "25 seconds",
        mood: "Confident, approachable, modern professional",
        script: "0:00-0:05 - Static shot holds on the three-quarter low angle. Model stands still, soft wind catches the fabric slightly.\n0:05-0:12 - Slow dolly forward, camera moves 3 feet closer. Model shifts weight.\n0:12-0:18 - Model turns head slowly toward camera, slight smile emerges.\n0:18-0:25 - Camera holds new position. Fade out."
    },
    "ID:2": {
        title: "MODERN STRUCTURE",
        duration: "20 seconds",
        mood: "Artistic, bold, structural",
        script: "0:00-0:05 - Overhead shot. Geometric shadows play across the floor.\n0:05-0:10 - Model looks up slightly, catching the light.\n0:10-0:20 - Slow rotation of camera 30 degrees clockwise. Fade."
    },
    "ID:3": {
        title: "TEXTURE & TONE",
        duration: "18 seconds",
        mood: "Intimate, luxurious, quality-focused",
        script: "0:00-0:06 - Extreme close-up of fabric texture.\n0:06-0:11 - Subtle camera pan right following the pattern.\n0:11-0:18 - Focus shifts to buttons. Slow zoom out."
    },
    "ID:4": {
        title: "CITY LIFE",
        duration: "30 seconds",
        mood: "Lifestyle, energetic, open",
        script: "0:00-0:10 - Wide shot showing the environment.\n0:10-0:20 - Model walks across the frame from left to right.\n0:20-0:30 - Camera pans to follow, revealing more background context."
    },
    "ID:5": {
        title: "PROFILE STUDY",
        duration: "15 seconds",
        mood: "Minimalist, clean, elegant",
        script: "0:00-0:05 - Static side profile.\n0:05-0:10 - Lighting shifts to create deeper contrast.\n0:10-0:15 - Model adjusts collar. Cut to black."
    }
};

// Placeholder images (using simple colored blocks with text via a service or just data URIs if possible, but let's use a placeholder service for now, or generated svgs)
// Ideally, I would generate SVGs on the fly to avoid external dependencies, but for simplicity let's assume we return URLs.
const generatePlaceholderUrl = (text, color = "cccccc") => `https://placehold.co/600x800/${color}/333333?text=${encodeURIComponent(text)}`;

export const api = {
    uploadImage: async (file) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: Math.random().toString(36).substr(2, 9),
                    url: URL.createObjectURL(file),
                    name: file.name
                });
            }, 500);
        });
    },

    analyzeProduct: async (productImageId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_ANALYSIS);
            }, DELAY_MS.ANALYSIS);
        });
    },

    generateTryOn: async (modelImageId, productIds, description) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    imageUrl: generatePlaceholderUrl("Virtual Try-On Result", "e0f2fe"),
                    timestamp: new Date().toISOString()
                });
            }, DELAY_MS.TRY_ON);
        });
    },

    generateAngles: async (tryOnImageId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_ANGLES_DESC);
            }, DELAY_MS.ANGLES);
        });
    },

    generateAngleImages: async (angleDescriptions) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate an image for each angle ID
                const images = {};
                Object.keys(angleDescriptions).forEach((key, index) => {
                    const colors = ["ffe4e6", "dcfce7", "fff7ed", "f3e8ff", "e0f2fe"];
                    images[key] = generatePlaceholderUrl(`Angle ${key}`, colors[index % colors.length]);
                });
                resolve(images);
            }, DELAY_MS.ANGLES); // Simulate time to gen images
        });
    },

    generateScenarios: async (angleImages) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_SCENARIOS);
            }, DELAY_MS.VIDEO_SCENARIO);
        });
    },

    generateVideos: async (scenarios) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Return video placeholder URLs (or images representing video thumbnails)
                const videos = {};
                Object.keys(scenarios).forEach(key => {
                    videos[key] = {
                        thumbnail: generatePlaceholderUrl(`Video ${key} Thumbnail`, "1e293b"),
                        url: "#", // In a real app this would be a .mp4
                        status: "completed"
                    };
                });
                resolve(videos);
            }, DELAY_MS.VIDEO_GEN);
        });
    }
};
