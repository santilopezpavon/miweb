export function fontSize(size) {
    switch (size) {
        case 1:
            return "text-xs"    
        case 2:
            return "text-lg-red lg:text-lg";
        case 3:
            return "text-xl-red lg:text-xl";
    }
}