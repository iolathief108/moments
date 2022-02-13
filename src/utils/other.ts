import { LocationsQuery, VendorType } from "../http/generated";
import { isDev } from "./pageUtils";


type LocalVendorTypes = {
    key: string;
    vendorType: VendorType;
    displayName: string;
    slug: string;
    headerText: string
}

export const localVendorTypes: LocalVendorTypes[] = [
    {
        key: "wedding-caterer",
        displayName: "Wedding Caterer",
        vendorType: VendorType.Caterer,
        slug: "wedding-catering",
        headerText: "Wedding Catering",
    },
    {
        key: "wedding-venue",
        displayName: "Wedding Venue",
        vendorType: VendorType.Venue,
        slug: "wedding-venue",
        headerText: "Wedding Venues & Banquet Halls",
    },
    {
        key: "wedding-photographer",
        displayName: "Wedding Photographer",
        vendorType: VendorType.Photographer,
        slug: "wedding-photographer",
        headerText: "Wedding Photographers",
    },
    {
        key: "wedding-videographer",
        displayName: "Wedding Videographer",
        vendorType: VendorType.Videographer,
        slug: "wedding-videographer",
        headerText: "Wedding Videographers",
    },
    {
        key: "jewellery",
        displayName: "Jewelleries",
        vendorType: VendorType.BandsDj,
        slug: "jewelleries",
        headerText: "Jewelleries",
    },
    // {
    //     key: "wedding-bands-dj",
    //     displayName: "Bands & DJs",
    //     vendorType: VendorType.BandsDj,
    //     slug: "wedding-bands-djs",
    //     headerText: "Wedding Bands and DJs",
    // },
    {
        key: "wedding-beauty-professionals",
        displayName: "Wedding Beauty Professionals",
        vendorType: VendorType.BeautyProfessional,
        slug: "wedding-beauty-professionals",
        headerText: "Wedding Hair and Bridal Makeup Artists",
    },
    {
        key: "wedding-cakes-desserts",
        displayName: "Wedding Cakes Desserts",
        vendorType: VendorType.CakesDessert,
        slug: "wedding-cakes-desserts",
        headerText: "Wedding Cakes & Desserts",
    },
    {
        key: "wedding-florists",
        displayName: "Wedding Florists",
        vendorType: VendorType.Florist,
        slug: "wedding-florists",
        headerText: "Wedding Florists",
    }
];


export function getVendorTypeInfo(vType?: VendorType | null): LocalVendorTypes | null {
    return localVendorTypes.find(value => value.vendorType === vType) ?? null;
}

export function getDistrictId(l: LocationsQuery, key: string): string | null {
    for (const district of l.districts) {
        if (district.key === key) return district.id;
    }
    return null;
}

export function getImageUrl(
    ...args:
        | [string, boolean?]
        | [string, number, boolean?]
        | [string, number, number, boolean?]
        | [string, number, number, number, boolean?]
) {
    let urlStr = args[0];
    urlStr = "/p/" + urlStr;
    if (typeof args[1] === "number") {
        if (typeof args[2] === "number") {
            urlStr += "_" + args[1] + "x" + args[2];
            if (typeof args[3] === "number") {
                urlStr += "q" + args[3];
            }
        } else {
            urlStr += "q" + args[1];
        }
    }

    if (typeof args[args.length - 1] === "boolean") {
        if (args[args.length - 1]) {
            return urlStr + ".webp";
        }
    }
    return urlStr + ".jpg";
}

export function getCategoryUrl(cat: VendorType): string {
    return `/search/${getVendorTypeInfo(cat)?.key}`;
}

export function getProductUrl(businessName: string, vType: VendorType, vid?: string) {
    return `/wedding-vendors/${getVendorTypeInfo(vType)?.slug}/${businessName}?vid=${vid}`;
}

export function getPlaceholder(vType: VendorType): string {
    if (vType === VendorType.Venue) {
        return "Behind the Venue";
    }
    if (vType === VendorType.Photographer) {
        return "Behind the Photo";
    }
    if (vType === VendorType.Caterer) {
        return "Behind the Cook";
    }
    return "";
}

export function titleCase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getBaseUrl() {
    if (isDev) {
        return "https://www.moments.lk";
        // return "";
    }
    return "";
}

export function getVendorTypeIcon(vType: VendorType) {
    switch (vType) {
        case VendorType.BandsDj:
            return "/images/cat/bands_dj.svg";
        case VendorType.Florist:
            return "/images/cat/bouquet.svg";
        case VendorType.Photographer:
            return "/images/cat/camera.svg";
        case VendorType.BeautyProfessional:
            return "/images/cat/hair_makeup.svg";
        case VendorType.Caterer:
            return "/images/cat/mixer.svg";
        case VendorType.Venue:
            return "/images/cat/venue.svg";
        case VendorType.Videographer:
            return "/images/cat/video.svg";
        case VendorType.CakesDessert:
            return "/images/cat/wedding_cake.svg";
    }
    return "/images/cat/wedding_cake.svg";
}






