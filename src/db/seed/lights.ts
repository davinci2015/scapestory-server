const lights = [
    {
        brand: 'Twinstar',
        models: [
            '300c',
            '300e',
            '300ea',
            '360e',
            '450e',
            '450ea',
            '600c',
            '600e',
            '600ea',
            '600s',
            '600sa',
            '600sp',
            '900e',
            '900ea',
            '900s',
            '900sa',
            '900sp',
        ],
    },
    {
        brand: 'Blau',
        models: [
            'Lumina Hybrid',
            'Lumina LED',
            'Lumina 424',
            'Lumina 439',
            'Lumina 454',
            'Lumina 480',
            'Lumina 639',
            'Lumina 654',
            'Lumina 680',
            'Lumina 839',
            'Lumina 854',
            'Lumina 880',
            'Lumina 1054',
            'Lumina 1080',
            'Mini Lumina 30 Marine',
            'Mini Lumina 30 Fresh Water',
            'Mini Lumina 40 Marine',
            'Mini Lumina 40 Fresh Water',
            'Mini Lumina 60 Marine',
            'Mini Lumina 60 Fresh Water',
            'Mini Lumina 90 Marine',
            'Mini Lumina 90 Fresh Water',
            'Nano LED light Fresh Water',
            'Nano LED light Marine',
        ],
    },
    {
        brand: 'Aqua Design Amano',
        models: [
            'Aquasky G 301',
            'Aquasky G 361',
            'Aquasky G 451',
            'Aquasky G 601',
            'Aquasky G 602',
            'Aquasky Moon 301',
            'Aquasky Moon 361',
            'Aquasky Moon 451',
            'Aquasky Moon 601',
            'Aquasky 301',
            'Aquasky 361',
            'Aquasky 451',
            'Aquasky 601',
            'Aquasky 602',
            'Solar RGB',
        ],
    },
    {
        brand: 'Finnex',
        models: [
            'FugeRay LED Daylight + Moonlights 10"',
            'FugeRay LED Daylight + Moonlights 12"',
            'FugeRay LED Daylight + Moonlights 16"',
            'FugeRay LED Daylight + Moonlights 18"',
            'FugeRay LED Daylight + Moonlights 20"',
            'FugeRay LED Daylight + Moonlights 24"',
            'FugeRay LED Daylight + Moonlights 30"',
            'FugeRay LED Daylight + Moonlights 36"',
            'FugeRay LED Daylight + Moonlights 48"',
            'FugeRay Planted+ LED Fixture 12"',
            'FugeRay Planted+ LED Fixture 16"',
            'FugeRay Planted+ LED Fixture 20"',
            'FugeRay Planted+ LED Fixture 24"',
            'FugeRay Planted+ LED Fixture 30"',
            'FugeRay Planted+ LED Fixture 36"',
            'FugeRay Planted+ LED Fixture 48"',
            'MonsterRay Color Enhancing LED 24"',
            'MonsterRay Color Enhancing LED 36"',
            'MonsterRay Color Enhancing LED 48"',
            'Planted+ 24/7 Automated LED v2 KL-20A',
            'Planted+ 24/7 Automated LED v2 KL-24A',
            'Planted+ 24/7 Automated LED v2 KL-30A',
            'Planted+ 24/7 Automated LED v2 KL-36A',
            'Planted+ 24/7 Automated LED v2 KL-48A',
            'Planted+ 24/7 CC Automated LED, Gun Metal, VL-CRA20',
            'Planted+ 24/7 CC Automated LED, Gun Metal, VL-CRA24',
            'Planted+ 24/7 CC Automated LED, Gun Metal, VL-CRA30',
            'Planted+ 24/7 CC Automated LED, Gun Metal, VL-CRA36',
            'Planted+ 24/7 CC Automated LED, Gun Metal, VL-CRA48',
            'Planted+ 24/7 CC Automated LED, Sleek Black, VL-CRB20',
            'Planted+ 24/7 CC Automated LED, Sleek Black, VL-CRB24',
            'Planted+ 24/7 CC Automated LED, Sleek Black, VL-CRB30',
            'Planted+ 24/7 CC Automated LED, Sleek Black, VL-CRB36',
            'Planted+ 24/7 CC Automated LED, Sleek Black, VL-CRB48',
            'Planted+ 24/7 SE Automated LED: 20"',
            'Planted+ 24/7 SE Automated LED: 24"',
            'Ray2 Ultra Slim LED (DS-Daylight) Ray II 16" DS',
            'Ray2 Ultra Slim LED (DS-Daylight) Ray II 18" DS',
            'Ray2 Ultra Slim LED (DS-Daylight) Ray II 24" DS',
            'Ray2 Ultra Slim LED (DS-Daylight) Ray II 30" DS',
            'Ray2 Ultra Slim LED (DS-Daylight) Ray II 36" DS',
            'Ray2 Ultra Slim LED (DS-Daylight) Ray II 48" DS',
            'Stingray Pencil Thin LED JL-16S',
            'Stingray Pencil Thin LED JL-20S',
            'Stingray Pencil Thin LED JL-24S',
            'Stingray Pencil Thin LED JL-30S',
            'Stingray Pencil Thin LED JL-36S',
            'Stingray Pencil Thin LED JL-48S',
        ],
    },
    {
        brand: 'Aqueon',
        models: [
            'Modular LED 20',
            'Modular LED 24',
            'Modular LED 30',
            'Modular LED 36',
            'Modular LED 48',
            'OpitBright LED Plus 30-36',
            'OptiBright LED 12-18',
            'OptiBright LED 18-24',
            'OptiBright LED 30-36',
            'OptiBright LED 48-54',
            'OptiBright LED Plus 18-24',
            'OptiBright LED Plus 48-54',
        ],
    },
    {
        brand: 'Marineland',
        models: [
            'Advanced LED ML90616',
            'Advanced LED ML90617',
            'Advanced LED ML90618',
            'Advanced LED ML90619',
            'LED Strip Light ML90612',
            'LED Strip Light ML90613',
            'LED Strip Light ML90614',
            'LED Strip Light ML90615',
        ],
    },
    {
        brand: 'Eheim',
        models: [
            'ClassicLED daylight',
            'PowerLED actnic blue',
            'PowerLED daylight',
            'PowerLED hybrid',
            'PowerLED plants',
            'PowerLED spots actinic blue',
            'PowerLED spots daylight',
            'PowerLED spots daylight & actinic blue',
            'PowerLED+ marine actinic',
            'PowerLED+ marine hybrid',
            'PowerLED+fresh daylight',
            'PowerLED+fresh plants',
        ],
    },
    {
        brand: 'Fluval',
        models: [
            'Aqualife & Plant Full Spectrum Performance LED 24-34 in',
            'Aqualife & Plant Full Spectrum Performance LED 36-48 in',
            'Aquasky LED 24-36 in',
            'Aquasky LED 36-48 in',
            'Aquasky LED 48-60 in',
            'Aquasky LED A3997',
            'Aquasky LED A3998',
            'Aquasky LED A3999',
            'Eco Bright LED 13586',
            'Eco Bright LED 13587',
            'Eco Bright LED 13588',
            'Eco Bright LED 13589',
            'Eco Bright LED 18-24 in',
            'Eco Bright LED 24-36 in',
            'Eco Bright LED 36-48 in',
            'Eco Bright LED 48-60 in',
            'Fresh & Plant 2.0 A3990',
            'Fresh & Plant 2.0 A3991',
            'Fresh & Plant 2.0 A3992',
            'Fresh & Plant 2.0 Full Spectrum Performance LED 24-34 in',
            'Fresh & Plant 2.0 Full Spectrum Performance LED 36-48 in',
            'Fresh & Plant 2.0 Full Spectrum Performance LED 48-60 in',
            'Nano Aura A3974',
            'Nano Aura High Performance LED Lamp',
            'Nano Fresh & Saltwater LED Lamp',
            'Prism Underwater Spotlight',
            'Ultra Bright LED Strip Light 36-48 in',
            'Ultra Bright LED Strip Light 48-60 in',
        ],
    },
    {
        brand: 'Ultum Nature Systems',
        models: [
            'Titan 1',
            'Titan 1 - Brushed Black Aluminum',
            'Titan 1 - Brushed Silver Aluminum',
        ],
    },
    {
        brand: 'Kessil',
        models: [
            'A150WE Amazon Sun',
            'A160WE Tuna Sun',
            'A360WE Tuna Sun',
            'A80 Tuna Blue',
            'A80 Tuna Sun',
            'H160 Tuna Flora',
            'H80 Tuna Flora LED',
        ],
    },
    {
        brand: 'ONF',
        models: [
            'Flat Nano - Rose Gold',
            'Flat Nano - Silver',
            'Flat One 2 Pendant Style',
            'Flat One 2 Standard Style',
            'Flat One 3 Pendant Style',
            'Flat One 3 Standard Style',
        ],
    },
    {
        brand: 'Chihiros',
        models: [
            'A1201',
            'A1201 Plus',
            'A201',
            'A251',
            'A301',
            'A301 Plus',
            'A311',
            'A351',
            'A361',
            'A401',
            'A401 Plus',
            'A451',
            'A451 Plus',
            'A501',
            'A501 Plus',
            'A601',
            'A601 Plus',
            'A801',
            'A901',
            'A901 Plus',
            'C201',
            'C251',
            'C301',
            'C361',
            'E201 Aquasky',
            'E251 Aquasky',
            'E301 Aquasky',
            'E311 Aquasky',
            'E351 Aquasky',
            'E361 Aquasky',
            'E401 Aquasky',
            'E451 Aquasky',
            'E451 Aquasky Double',
            'E501 Aquasky',
            'E601 Aquasky',
            'E601 Aquasky Double',
            'RGB-30',
            'RGB-45',
            'RGB-60',
        ],
    },
]

export default lights
