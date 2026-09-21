(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/helpers/haptics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Native Haptic Vibration Feedback Engine for Mobile Devices
__turbopack_context__.s([
    "triggerHaptic",
    ()=>triggerHaptic
]);
const triggerHaptic = (type = 'light')=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!('vibrate' in navigator)) return;
    try {
        switch(type){
            case 'light':
                navigator.vibrate(8);
                break;
            case 'selection':
                navigator.vibrate(12);
                break;
            case 'medium':
                navigator.vibrate(22);
                break;
            case 'heavy':
                navigator.vibrate([
                    28,
                    35,
                    20
                ]);
                break;
            case 'success':
                navigator.vibrate([
                    10,
                    30,
                    15
                ]);
                break;
            case 'warning':
                navigator.vibrate([
                    25,
                    40,
                    25,
                    40,
                    20
                ]);
                break;
            default:
                navigator.vibrate(10);
        }
    } catch  {
    // Non-blocking fallback if permissions or battery saver prevents vibration
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_helpers_haptics_ts_1xfzjxu._.js.map