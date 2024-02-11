async function resolveKData(key){
    switch (key) {
        case 1: return await import("./k_1.json"); break;
        case 2: return await import("./k_2.json"); break;
        case 3: return await import("./k_3.json"); break;
        case 4: return await import("./k_4.json"); break;
        case 5: return await import("./k_5.json"); break;
        case 6: return await import("./k_6.json"); break;
        case 7: return await import("./k_7.json"); break;
        case 8: return await import("./k_8.json"); break;
        case 9: return await import("./k_9.json"); break;
        case 10: return await import("./k_10.json"); break;
        case 11: return await import("./k_11.json"); break;
        case 12: return await import("./k_12.json"); break;
        case 13: return await import("./k_13.json"); break;
        case 14: return await import("./k_14.json"); break;
        case 15: return await import("./k_15.json"); break;
        case 16: return await import("./k_16.json"); break;
        case 17: return await import("./k_17.json"); break;
        case 18: return await import("./k_18.json"); break;
    
        default:
            break;
    }
}

export{resolveKData}

// export{resolveKData}