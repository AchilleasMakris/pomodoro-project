import { R2_MUSIC_BASE_URL } from './ambientSoundsConfig.js';

// Music Player Module
// Handles local audio playback with full controls

// Music library - All tracks from your collection (799 tracks!)
const MUSIC_LIBRARY = [
  {
    id: '01-beyond-the-oceans-feat-hoogway',
    title: 'beyond the oceans (feat. Hoogway)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(01) beyond the oceans (feat. Hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-ayla',
    title: 'ayla',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(02) ayla.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-seashore-thoughts-feat-hoogway',
    title: 'seashore thoughts (feat. Hoogway)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(03) seashore thoughts (feat. Hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-harbor-feat-mondo-loops',
    title: 'harbor (feat. Mondo Loops)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(04) harbor (feat. Mondo Loops).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-time-to-leave-feat-softy',
    title: 'time to leave (feat. Softy)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(05) time to leave (feat. Softy).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-i-can-t-give-up-feat-banks',
    title: 'I can_t give up (feat. Banks)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(06) I can_t give up (feat. Banks).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-breaking-point-feat-dimension32',
    title: 'breaking point (feat. Dimension32)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(07) breaking point (feat. Dimension32).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-drunk-waves-feat-hoogway',
    title: 'drunk waves (feat. Hoogway)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/(08) drunk waves (feat. Hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '001-the-descent',
    title: 'The Descent',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/001 The Descent.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '002-birds-eye-view-ft-middle-school',
    title: 'Birds Eye View (feat. middle school)',
    artist: 'middle school',
    file: "/r2-audio/lofi/002 Birds Eye View (ft middle school).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '003-warm-winds',
    title: 'Warm Winds',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/003 Warm Winds.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '004-things-in-between',
    title: 'Things In Between',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/004 Things In Between.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '005-rainshadow-ft-dillan-witherow',
    title: 'Rainshadow (feat. Dillan Witherow)',
    artist: 'Dillan Witherow',
    file: "/r2-audio/lofi/005 Rainshadow (ft Dillan Witherow).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '006-road-back-home',
    title: 'Road Back Home',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/006 Road Back Home.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '007-light-leaks',
    title: 'Light Leaks',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/007 Light Leaks.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '008-while-it-lasts',
    title: 'While It Lasts',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/008 While It Lasts.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-germination-ft-amess',
    title: 'Germination (ft. Amess)',
    artist: '',
    file: "/r2-audio/lofi/01 - Germination (ft. Amess).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-krynoze-x-sweet-medicine-by-your-side',
    title: 'Krynoze x Sweet Medicine - By Your Side',
    artist: '',
    file: "/r2-audio/lofi/01 - Krynoze x Sweet Medicine - By Your Side.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-mujo-x-sweet-medicine-x-juniorodeo-panacea-master',
    title: 'Mujo x Sweet Medicine x juniorodeo - Panacea MASTER',
    artist: '',
    file: "/r2-audio/lofi/01 - Mujo x Sweet Medicine x juniorodeo - Panacea MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-places',
    title: 'Places',
    artist: '',
    file: "/r2-audio/lofi/01 - Places.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-autumn-breeze-master',
    title: 'Autumn Breeze (Master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/01 Autumn Breeze (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-cozy-cuddles-ft-sitting-duck-waywell',
    title: 'Cozy Cuddles (feat. Sitting Duck _ Waywell)',
    artist: 'Sitting Duck _ Waywell',
    file: "/r2-audio/lofi/01 Cozy Cuddles (ft. Sitting Duck _ Waywell).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-lawrence-walther-x-less-gravity-floating-drifting',
    title: 'Floating, Drifting',
    artist: 'Lawrence Walther x Less Gravity',
    file: "/r2-audio/lofi/01 Lawrence Walther x Less Gravity - Floating, Drifting.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-no-spirit-happy-moments-master',
    title: 'Happy Moments (Master)',
    artist: 'No Spirit',
    file: "/r2-audio/lofi/01 No Spirit - Happy Moments (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-ocean-planet-w-barnes-blvd-master-online-audio-converter-',
    title: 'Ocean Planet (with Barnes Blvd MASTER (online-audio-converter.com))',
    artist: 'Barnes Blvd MASTER (online-audio-converter.com)',
    file: "/r2-audio/lofi/01 Ocean Planet w_ Barnes Blvd MASTER (online-audio-converter.com).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-project-aer-june-2018-master',
    title: 'June, 2018_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/01 Project AER - June, 2018_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-tibeauthetraveler-cherry-tree-kupla-master',
    title: 'Cherry Tree (Kupla Master)',
    artist: 'Tibeauthetraveler',
    file: "/r2-audio/lofi/01 Tibeauthetraveler - Cherry Tree (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-tibeauthetraveler-x-so-lo-goodnight',
    title: 'Goodnight',
    artist: 'Tibeauthetraveler x So.Lo',
    file: "/r2-audio/lofi/01 Tibeauthetraveler x So.Lo - Goodnight.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-takeoff',
    title: 'takeoff',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/01 takeoff.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-ticofaces-arrival-w-mondo-loops',
    title: 'Arrival w_ Mondo Loops',
    artist: 'ticofaces',
    file: "/r2-audio/lofi/01 ticofaces - Arrival w_ Mondo Loops.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-parhelia',
    title: 'Parhelia',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/01. Parhelia.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-blank-canvas-feat-phlocalyst',
    title: '_Blank_Canvas_Feat_Phlocalyst',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/01_Blank_Canvas_Feat_Phlocalyst.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '01-thinking-of-you',
    title: '_Thinking of You',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/01_Thinking of You.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-azure',
    title: 'Azure',
    artist: '',
    file: "/r2-audio/lofi/02 - Azure.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-krynoze-x-sweet-medicine-hold-my-hand',
    title: 'Krynoze x Sweet Medicine - Hold My Hand',
    artist: '',
    file: "/r2-audio/lofi/02 - Krynoze x Sweet Medicine - Hold My Hand.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-mujo-x-sweet-medicine-x-jhove-everything-gone-master',
    title: 'Mujo x Sweet Medicine x Jhove - Everything Gone MASTER',
    artist: '',
    file: "/r2-audio/lofi/02 - Mujo x Sweet Medicine x Jhove - Everything Gone MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-submarine-embrace-ft-hoogway',
    title: 'Submarine Embrace (ft. Hoogway)',
    artist: '',
    file: "/r2-audio/lofi/02 - Submarine Embrace (ft. Hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-cabin-shade-master',
    title: 'Cabin Shade (Master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/02 Cabin Shade (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-horizon-master',
    title: 'Horizon MASTER',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/02 Horizon MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-lawrence-walther-x-bcalm-city-nights',
    title: 'City Nights',
    artist: 'Lawrence Walther x Bcalm',
    file: "/r2-audio/lofi/02 Lawrence Walther x Bcalm - City Nights.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-no-spirit-x-tonion-running-out-of-time-master',
    title: 'Running Out Of Time (Master)',
    artist: 'No Spirit x Tonion',
    file: "/r2-audio/lofi/02 No Spirit x Tonion - Running Out Of Time (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-project-aer-calm-mind-w-hoogway-master',
    title: 'Calm Mind w Hoogway_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/02 Project AER - Calm Mind w Hoogway_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-serendipity-feat-softy',
    title: 'Serendipity (feat. Softy)',
    artist: 'Softy',
    file: "/r2-audio/lofi/02 Serendipity (feat. Softy).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-tenno-the-guiding-wind-kupla-master',
    title: 'The Guiding Wind (Kupla Master)',
    artist: 'Tenno',
    file: "/r2-audio/lofi/02 Tenno - The Guiding Wind (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-white-sheets-ft-phlocalyst-waywell',
    title: 'White Sheets (feat. Phlocalyst _ Waywell)',
    artist: 'Phlocalyst _ Waywell',
    file: "/r2-audio/lofi/02 White Sheets (ft. Phlocalyst _ Waywell).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-eaup-x-epona-seashells',
    title: 'Seashells',
    artist: 'eaup x Epona',
    file: "/r2-audio/lofi/02 eaup x Epona - Seashells.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-polaris',
    title: 'polaris',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/02 polaris.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-ticofaces-jungle',
    title: 'Jungle',
    artist: 'ticofaces',
    file: "/r2-audio/lofi/02 ticofaces - Jungle.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-cloud-shapes',
    title: 'Cloud Shapes',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/02. Cloud Shapes.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-angelic-particles',
    title: '_Angelic_Particles',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/02_Angelic_Particles.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '02-dark-chocolate-with-slo-loris',
    title: '_Dark Chocolate with Slo Loris',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/02_Dark Chocolate with Slo Loris.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-ballads',
    title: 'Ballads',
    artist: '',
    file: "/r2-audio/lofi/03 - Ballads.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-krynoze-x-sweet-medicine-i-ll-be-there',
    title: 'Krynoze x Sweet Medicine - I_ll Be There',
    artist: '',
    file: "/r2-audio/lofi/03 - Krynoze x Sweet Medicine - I_ll Be There.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-mujo-x-sweet-medicine-flooded-with-light-master',
    title: 'Mujo x Sweet Medicine - Flooded With Light MASTER',
    artist: '',
    file: "/r2-audio/lofi/03 - Mujo x Sweet Medicine - Flooded With Light MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-sediments-ft-dimension-32',
    title: 'Sediments (ft. Dimension 32)',
    artist: '',
    file: "/r2-audio/lofi/03 - Sediments (ft. Dimension 32).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-andromeda-master',
    title: 'Andromeda MASTER',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/03 Andromeda MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-bathroom-marble-ft-akin-cuebe',
    title: 'Bathroom Marble (feat. Akin _ Cuebe)',
    artist: 'Akin _ Cuebe',
    file: "/r2-audio/lofi/03 Bathroom Marble (ft. Akin _ Cuebe).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-birdwatching-w-juniorodeo-azula-master',
    title: 'Birdwatching (with juniorodeo _ azula (Master))',
    artist: 'juniorodeo _ azula (Master)',
    file: "/r2-audio/lofi/03 Birdwatching w_ juniorodeo _ azula (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-lawrence-walther-x-tibeauthetraveler-tender',
    title: 'Tender',
    artist: 'Lawrence Walther x Tibeauthetraveler',
    file: "/r2-audio/lofi/03 Lawrence Walther x Tibeauthetraveler - Tender.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-lawrence-walther-x-softy-x-tibeauthetraveler-still-lake',
    title: 'Still Lake',
    artist: 'Lawrence Walther x softy x Tibeauthetraveler',
    file: "/r2-audio/lofi/03 Lawrence Walther x softy x Tibeauthetraveler - Still Lake.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-no-spirit-shooting-stars-master2',
    title: 'Shooting Stars (Master2)',
    artist: 'No Spirit',
    file: "/r2-audio/lofi/03 No Spirit - Shooting Stars (Master2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-project-aer-today-was-a-good-day-master',
    title: 'Today Was A Good Day_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/03 Project AER - Today Was A Good Day_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-raimu-tophat-panda-kaigan-kupla-master',
    title: 'Kaigan (Kupla Master)',
    artist: 'Raimu _ Tophat Panda',
    file: "/r2-audio/lofi/03 Raimu _ Tophat Panda - Kaigan (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-waking-dream-feat-cxlt',
    title: 'Waking Dream (feat. cxlt.)',
    artist: 'cxlt.',
    file: "/r2-audio/lofi/03 Waking Dream (feat. cxlt.).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-ticofaces-lunar-sight-w-loafy-building',
    title: 'Lunar Sight w_ Loafy Building',
    artist: 'ticofaces',
    file: "/r2-audio/lofi/03 ticofaces - Lunar Sight w_ Loafy Building.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-vega',
    title: 'vega',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/03 vega.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-backyard-shower',
    title: 'Backyard Shower',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/03. Backyard Shower.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-gentle-breeze-with-tyluv-and-dillon-witherow',
    title: '_Gentle Breeze with Tyluv and Dillon Witherow',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/03_Gentle Breeze with Tyluv and Dillon Witherow.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '03-morning-bliss',
    title: '_Morning_Bliss',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/03_Morning_Bliss.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-krynoze-x-sweet-medicine-feeling-alone',
    title: 'Krynoze x Sweet Medicine - Feeling Alone',
    artist: '',
    file: "/r2-audio/lofi/04 - Krynoze x Sweet Medicine - Feeling Alone.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-mujo-x-sweet-medicine-x-purrple-cat-backwards-master',
    title: 'Mujo x Sweet Medicine x Purrple Cat - Backwards MASTER',
    artist: '',
    file: "/r2-audio/lofi/04 - Mujo x Sweet Medicine x Purrple Cat - Backwards MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-unfamiliar-beds-ft-hoogway',
    title: 'Unfamiliar Beds (ft. Hoogway)',
    artist: '',
    file: "/r2-audio/lofi/04 - Unfamiliar Beds (ft. Hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-velvet',
    title: 'Velvet',
    artist: '',
    file: "/r2-audio/lofi/04 - Velvet.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-ambulo-windmills-kupla-master',
    title: 'Windmills  (Kupla Master)',
    artist: 'Ambulo',
    file: "/r2-audio/lofi/04 Ambulo - Windmills  (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-astro-w-frumhere-hixon-foster-master',
    title: 'Astro (with Frumhere & Hixon Foster MASTER)',
    artist: 'Frumhere & Hixon Foster MASTER',
    file: "/r2-audio/lofi/04 Astro w_ Frumhere & Hixon Foster MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-gavarine-falls-feat-mondo-loops',
    title: 'Gavarine Falls (feat. Mondo Loops)',
    artist: 'Mondo Loops',
    file: "/r2-audio/lofi/04 Gavarine Falls (feat. Mondo Loops).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-lawrence-walther-x-cxlt-find-your-way',
    title: 'Find Your Way',
    artist: 'Lawrence Walther x cxlt.',
    file: "/r2-audio/lofi/04 Lawrence Walther x cxlt. - Find Your Way.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-midas-ft-waywell',
    title: 'Midas (feat. Waywell)',
    artist: 'Waywell',
    file: "/r2-audio/lofi/04 Midas (ft. Waywell).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-no-spirit-x-jhove-we-are-going-to-be-ok-master',
    title: 'We Are Going To Be Ok (Master)',
    artist: 'No Spirit x Jhove',
    file: "/r2-audio/lofi/04 No Spirit x Jhove - We Are Going To Be Ok (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-project-aer-snow-day-w-colours-in-context-master',
    title: 'Snow Day w Colours in Context_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/04 Project AER - Snow Day w Colours in Context_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-swaying-trees-master',
    title: 'Swaying Trees (Master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/04 Swaying Trees (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-wys-simple-dreams',
    title: 'Simple Dreams',
    artist: 'WYS',
    file: "/r2-audio/lofi/04 WYS - Simple Dreams.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-sirius',
    title: 'sirius',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/04 sirius.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-ticofaces-close-by-w-loafy-building-mondo-loops',
    title: 'Close By w_ Loafy Building _ Mondo Loops',
    artist: 'ticofaces',
    file: "/r2-audio/lofi/04 ticofaces - Close By w_ Loafy Building _ Mondo Loops.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-fields',
    title: 'Fields',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/04. Fields.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-butterfly-nebula',
    title: '_Butterfly_Nebula',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/04_Butterfly_Nebula.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '04-fresh-snow',
    title: '_Fresh Snow',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/04_Fresh Snow.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-autumn',
    title: 'Autumn',
    artist: '',
    file: "/r2-audio/lofi/05 - Autumn.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-crackling-woods-ft-goson',
    title: 'Crackling Woods (ft. Goson)',
    artist: '',
    file: "/r2-audio/lofi/05 - Crackling Woods (ft. Goson).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-krynoze-x-sweet-medicine-x-hoogway-deep-in-motion',
    title: 'Krynoze x Sweet Medicine x Hoogway - Deep In Motion',
    artist: '',
    file: "/r2-audio/lofi/05 - Krynoze x Sweet Medicine x Hoogway - Deep In Motion.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-mujo-x-sweet-medicine-x-g-mills-evergreen-master',
    title: 'Mujo x Sweet Medicine x G Mills - Evergreen MASTER',
    artist: '',
    file: "/r2-audio/lofi/05 - Mujo x Sweet Medicine x G Mills - Evergreen MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-chau-sara-deep-dive',
    title: 'Deep Dive',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/05 Chau Sara - Deep Dive.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-falling-feathers-master',
    title: 'Falling Feathers (Master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/05 Falling Feathers (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-lawrence-walther-x-tibeauthetraveler-beautiful-moments',
    title: 'Beautiful Moments',
    artist: 'Lawrence Walther x Tibeauthetraveler',
    file: "/r2-audio/lofi/05 Lawrence Walther x Tibeauthetraveler - Beautiful Moments.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-nightingale-ft-m-e-a-d-o-w-mowlvoorph',
    title: 'Nightingale (feat. M e a d o w _ Mowlvoorph)',
    artist: 'M e a d o w _ Mowlvoorph',
    file: "/r2-audio/lofi/05 Nightingale (ft. M e a d o w _ Mowlvoorph).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-no-spirit-x-softy-lift-up-master',
    title: 'Lift Up (Master)',
    artist: 'No Spirit x Softy',
    file: "/r2-audio/lofi/05 No Spirit x Softy - Lift Up (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-project-aer-waterways-new-master',
    title: 'Waterways NEW_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/05 Project AER - Waterways NEW_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-satellite-master',
    title: 'Satellite MASTER',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/05 Satellite MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-white-cliffs-feat-l-outlander',
    title: 'White Cliffs (feat. l_Outlander)',
    artist: 'l_Outlander',
    file: "/r2-audio/lofi/05 White Cliffs (feat. l_Outlander).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-jhove-shibui-kupla-master',
    title: 'shibui (Kupla Master)',
    artist: 'jhove',
    file: "/r2-audio/lofi/05 jhove - shibui (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-southern-cross',
    title: 'southern cross',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/05 southern cross.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-ticofaces-crescent-w-yestalgia',
    title: 'Crescent w_ Yestalgia',
    artist: 'ticofaces',
    file: "/r2-audio/lofi/05 ticofaces - Crescent w_ Yestalgia.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-travelogue-feat-c4c',
    title: 'Travelogue (feat. C4C)',
    artist: 'C4C',
    file: "/r2-audio/lofi/05. Travelogue (feat. C4C).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-hot-coffee-with-scayos',
    title: '_Hot Coffee with Scayos',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/05_Hot Coffee with Scayos.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '05-stardust',
    title: '_Stardust',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/05_Stardust.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-krynoze-x-sweet-medicine-restless-heart',
    title: 'Krynoze x Sweet Medicine - Restless Heart',
    artist: '',
    file: "/r2-audio/lofi/06 - Krynoze x Sweet Medicine - Restless Heart.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-mujo-x-sweet-medicine-x-hoogway-all-the-good-times-master',
    title: 'Mujo x Sweet Medicine x Hoogway - All The Good Times MASTER',
    artist: '',
    file: "/r2-audio/lofi/06 - Mujo x Sweet Medicine x Hoogway - All The Good Times MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-old-feelings',
    title: 'Old Feelings',
    artist: '',
    file: "/r2-audio/lofi/06 - Old Feelings.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-reins-ft-sweet-medicine',
    title: 'Reins (ft. Sweet Medicine)',
    artist: '',
    file: "/r2-audio/lofi/06 - Reins (ft. Sweet Medicine).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-catnap-w-enluv-master',
    title: 'Catnap (with enluv (Master))',
    artist: 'enluv (Master)',
    file: "/r2-audio/lofi/06 Catnap w_ enluv (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-dawnstar-ft-waywell-phlocalyst-s-tyr',
    title: 'Dawnstar (feat. Waywell _ Phlocalyst _ Sátyr)',
    artist: 'Waywell _ Phlocalyst _ Sátyr',
    file: "/r2-audio/lofi/06 Dawnstar (ft. Waywell _ Phlocalyst _ Sátyr).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-galaxy-w-phlocalyst-master',
    title: 'Galaxy (with Phlocalyst MASTER)',
    artist: 'Phlocalyst MASTER',
    file: "/r2-audio/lofi/06 Galaxy w_ Phlocalyst MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-lawrence-walther-x-less-gravity-intersection',
    title: 'Intersection',
    artist: 'Lawrence Walther x Less Gravity',
    file: "/r2-audio/lofi/06 Lawrence Walther x Less Gravity - Intersection.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-no-spirit-x-juniorodeo-winter-meadow-master2',
    title: 'Winter Meadow (Master2)',
    artist: 'No Spirit x juniorodeo',
    file: "/r2-audio/lofi/06 No Spirit x juniorodeo - Winter Meadow (Master2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-project-aer-anywhere-else-w-cxlt-master-w-fadein',
    title: 'Anywhere Else w cxlt_MASTER w fadein',
    artist: 'Project AER',
    file: "/r2-audio/lofi/06 Project AER - Anywhere Else w cxlt_MASTER w fadein.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-purrple-cat-mystic-mountain-kupla-master',
    title: 'Mystic Mountain (Kupla Master)',
    artist: 'Purrple Cat',
    file: "/r2-audio/lofi/06 Purrple Cat - Mystic Mountain (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-purrple-cat-sleepless',
    title: 'Sleepless',
    artist: 'Purrple Cat',
    file: "/r2-audio/lofi/06 Purrple Cat - Sleepless.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-orion',
    title: 'orion',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/06 orion.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-ticofaces-the-isle-w-spinmont',
    title: 'The Isle w_ Spinmont',
    artist: 'ticofaces',
    file: "/r2-audio/lofi/06 ticofaces - The Isle w_ Spinmont.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-bumpin-on-sunset',
    title: '_Bumpin_on_Sunset',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/06_Bumpin_on_Sunset.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '06-watching-the-stars',
    title: '_Watching the Stars',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/06_Watching the Stars.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-anywhere-but-here',
    title: 'Anywhere But Here',
    artist: '',
    file: "/r2-audio/lofi/07 - Anywhere But Here.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-breaking-dawn-ft-tibeauthetraveler',
    title: 'Breaking Dawn (ft. Tibeauthetraveler)',
    artist: '',
    file: "/r2-audio/lofi/07 - Breaking Dawn (ft. Tibeauthetraveler).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-krynoze-x-sweet-medicine-where-are-you',
    title: 'Krynoze x Sweet Medicine - Where Are You',
    artist: '',
    file: "/r2-audio/lofi/07 - Krynoze x Sweet Medicine - Where Are You.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-mujo-x-sweet-medicine-peace-of-mind-master',
    title: 'Mujo x Sweet Medicine - Peace Of Mind MASTER',
    artist: '',
    file: "/r2-audio/lofi/07 - Mujo x Sweet Medicine - Peace Of Mind MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-lawrence-walther-x-sweet-medicine-close-to-me',
    title: 'Close to Me',
    artist: 'Lawrence Walther x Sweet Medicine',
    file: "/r2-audio/lofi/07 Lawrence Walther x Sweet Medicine - Close to Me.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-nebula-master',
    title: 'Nebula MASTER',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/07 Nebula MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-no-spirit-innocence-master',
    title: 'Innocence (Master)',
    artist: 'No Spirit',
    file: "/r2-audio/lofi/07 No Spirit - Innocence (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-project-aer-where-we-are-master',
    title: 'Where We Are_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/07 Project AER - Where We Are_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-raimu-danisogen-in-love-with-the-sky-kupla-master',
    title: 'In Love With The Sky (Kupla Master)',
    artist: 'Raimu _ DaniSogen',
    file: "/r2-audio/lofi/07 Raimu _ DaniSogen - In Love With The Sky (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-soaring-master',
    title: 'Soaring (Master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/07 Soaring (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-fourwalls-x-umbriel-talked-in-a-dream',
    title: 'talked in a dream',
    artist: 'fourwalls x Umbriel',
    file: "/r2-audio/lofi/07 fourwalls x Umbriel - talked in a dream.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-holnap',
    title: '_Holnap',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/07_Holnap.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '07-ocean-sunset',
    title: '_Ocean Sunset',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/07_Ocean Sunset.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-krynoze-x-sweet-medicine-insides',
    title: 'Krynoze x Sweet Medicine - Insides',
    artist: '',
    file: "/r2-audio/lofi/08 - Krynoze x Sweet Medicine - Insides.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-let-go',
    title: 'Let Go',
    artist: '',
    file: "/r2-audio/lofi/08 - Let Go.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-mujo-x-sweet-medicine-healing-winds-master',
    title: 'Mujo x Sweet Medicine - Healing Winds MASTER',
    artist: '',
    file: "/r2-audio/lofi/08 - Mujo x Sweet Medicine - Healing Winds MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-turnings-ft-wys',
    title: 'Turnings (ft. WYS)',
    artist: '',
    file: "/r2-audio/lofi/08 - Turnings (ft. WYS).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-celestial-alignment-the-view-from-the-monastery-kupla-mas',
    title: 'The View From The Monastery (Kupla Master)',
    artist: 'Celestial Alignment',
    file: "/r2-audio/lofi/08 Celestial Alignment - The View From The Monastery (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-chau-sara-friday',
    title: 'Friday',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/08 Chau Sara - Friday.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-interstellar-w-strehlow-master',
    title: 'Interstellar (with Strehlow MASTER)',
    artist: 'Strehlow MASTER',
    file: "/r2-audio/lofi/08 Interstellar w_ Strehlow MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-lawrence-walther-x-less-gravity-feathers',
    title: 'Feathers',
    artist: 'Lawrence Walther x Less Gravity',
    file: "/r2-audio/lofi/08 Lawrence Walther x Less Gravity - Feathers.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-no-spirit-from-where-we-started-master',
    title: 'From Where We Started (Master)',
    artist: 'No Spirit',
    file: "/r2-audio/lofi/08 No Spirit - From Where We Started (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-project-aer-disappear-master',
    title: 'Disappear_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/08 Project AER - Disappear_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-treetops-w-slo-loris-master',
    title: 'Treetops (with Slo Loris (Master))',
    artist: 'Slo Loris (Master)',
    file: "/r2-audio/lofi/08 Treetops w_ Slo Loris (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '08-afternoon-nap',
    title: '_Afternoon Nap',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/08_Afternoon Nap.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-drippin-love-ft-slowheal',
    title: 'Drippin_ Love (ft. Slowheal)',
    artist: '',
    file: "/r2-audio/lofi/09 - Drippin_ Love (ft. Slowheal).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-hoffy-beats-x-enluv-leaving-earth',
    title: 'Leaving Earth',
    artist: 'Hoffy Beats x Enluv',
    file: "/r2-audio/lofi/09 Hoffy Beats x Enluv - Leaving Earth.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-lawrence-walther-x-less-gravity-serene',
    title: 'Serene',
    artist: 'Lawrence Walther x Less Gravity',
    file: "/r2-audio/lofi/09 Lawrence Walther x Less Gravity - Serene.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-lunar-souls-interlude-master',
    title: 'Lunar Souls (Interlude) MASTER',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/09 Lunar Souls (Interlude) MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-midnight-alpha-winter-gardens-w-nothingtosay-kupla-master',
    title: 'Winter Gardens (w Nothingtosay) (Kupla Master)',
    artist: 'Midnight Alpha',
    file: "/r2-audio/lofi/09 Midnight Alpha - Winter Gardens (w Nothingtosay) (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-no-spirit-x-sitting-duck-x-manocchs-nomads-of-the-ocean-m',
    title: 'Nomads Of The Ocean (Master)',
    artist: 'No Spirit x Sitting Duck x Manocchs',
    file: "/r2-audio/lofi/09 No Spirit x Sitting Duck x Manocchs - Nomads Of The Ocean (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-project-aer-clockwork-w-hevi-master',
    title: 'Clockwork w Hevi_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/09 Project AER - Clockwork w Hevi_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '09-songbirds-master',
    title: 'Songbirds (Master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/09 Songbirds (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-exchange',
    title: 'Exchange',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1 Exchange.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-falling-softly',
    title: 'Falling Softly',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1 Falling Softly.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-kids',
    title: 'Kids',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1 Kids.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-laffey-heartspace-master-v1',
    title: 'Heartspace (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/1 Laffey - Heartspace (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-laffey-x-softy-horizon-master-v2',
    title: 'Horizon (Master V2)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/1 Laffey x Softy - Horizon (Master V2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-lost-world',
    title: 'Lost World',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1 Lost World.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-stargazing-ft-cxlt',
    title: 'Stargazing ft Cxlt',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1 Stargazing ft Cxlt .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-mell-x-ambulo-drift-away-master',
    title: 'Drift Away (MASTER)',
    artist: 'mell-ø x Ambulo',
    file: "/r2-audio/lofi/1 mell-ø x Ambulo - Drift Away (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-a-way-home',
    title: ') A Way Home',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1) A Way Home.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-dusty-records',
    title: ') Dusty Records',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1) Dusty Records.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-ethereal-feat-h-1',
    title: ') Ethereal (feat. H.1)',
    artist: 'H.1',
    file: "/r2-audio/lofi/1) Ethereal (feat H.1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-mindeliq-neele-harder-new-horizons',
    title: 'New Horizons',
    artist: ') Mindeliq _ Neele Harder',
    file: "/r2-audio/lofi/1) Mindeliq _ Neele Harder - New Horizons.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-a-walk-through-the-sky',
    title: 'A Walk Through the Sky',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. A Walk Through the Sky.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-across-the-rainbow',
    title: 'Across The Rainbow',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Across The Rainbow.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-ballerina',
    title: 'Ballerina',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Ballerina.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-bcalm-banks-anemone-final',
    title: 'Anemone (Final)',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/1. Bcalm _ Banks - Anemone (Final).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-bcalm-softy-times-with-you',
    title: 'times with you',
    artist: 'Bcalm _ softy',
    file: "/r2-audio/lofi/1. Bcalm _ softy - times with you.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-casiio-sleepermane-spheres-13lufs',
    title: 'Spheres -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/1. Casiio _ Sleepermane - Spheres -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-collapse-feat-squeeda',
    title: 'Collapse (feat. squeeda)',
    artist: 'squeeda',
    file: "/r2-audio/lofi/1. Collapse (feat. squeeda).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-leaving-this-place-master',
    title: 'Leaving This Place (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Leaving This Place (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-moving-in-master',
    title: 'Moving In (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Moving In (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-never-be-prey-to-the-winds',
    title: 'Never be prey to the winds',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Never be prey to the winds.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-old-hourglass-1',
    title: 'Old Hourglass (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Old Hourglass (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-phlocalyst-mr-k-fer-lessons-in-nature',
    title: 'Lessons in Nature',
    artist: 'Phlocalyst _ Mr. Käfer',
    file: "/r2-audio/lofi/1. Phlocalyst _ Mr. Käfer - Lessons in Nature.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-reservoirs',
    title: 'Reservoirs',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Reservoirs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-scenery-master',
    title: 'Scenery (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Scenery (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-the-look-remaster-2',
    title: 'The Look (Remaster) 2',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. The Look (Remaster) 2.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-your-light',
    title: 'Your Light',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. Your Light .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-circadian-ft-enluv',
    title: 'circadian ft. Enluv',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. circadian ft. Enluv.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-clear-eyes-blind-sight',
    title: 'clear eyes, blind sight',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. clear eyes, blind sight.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-hi-jude-flutter',
    title: 'flutter',
    artist: 'hi jude',
    file: "/r2-audio/lofi/1. hi jude - flutter.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-i-hope-u-feel-better-now',
    title: 'i hope u feel better now',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. i hope u feel better now.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-iamalex-felty-summer-rain',
    title: 'Summer Rain',
    artist: 'iamalex & Felty',
    file: "/r2-audio/lofi/1. iamalex & Felty - Summer Rain.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-miss-you-master',
    title: 'miss you (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1. miss you (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-sleepermane-out-of-reach-13lufs-final',
    title: 'out of reach -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/1. sleepermane - out of reach -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-towerz-edelwize-ft-kokoro-from-me-to-you',
    title: 'from me to you',
    artist: 'towerz _ edelwize ft. kokoro',
    file: "/r2-audio/lofi/1. towerz _ edelwize ft. kokoro - from me to you.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-one-way-ticket',
    title: 'One Way Ticket',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1.One Way Ticket.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-reverie-ft-tibeauthetraveler',
    title: 'Reverie (ft. Tibeauthetraveler)',
    artist: '',
    file: "/r2-audio/lofi/10 - Reverie (ft. Tibeauthetraveler).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-field-guide-w-oatmello-master',
    title: 'Field Guide (with Oatmello (Master))',
    artist: 'Oatmello (Master)',
    file: "/r2-audio/lofi/10 Field Guide w_ Oatmello (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-laffey-skipping-rocks-master-v1',
    title: 'Skipping Rocks (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/10 Laffey - Skipping Rocks (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-no-spirit-where-i-found-you-master',
    title: 'Where I Found You (Master)',
    artist: 'No Spirit',
    file: "/r2-audio/lofi/10 No Spirit - Where I Found You (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-project-aer-the-aftermath-master',
    title: 'The Aftermath_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/10 Project AER - The Aftermath_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-remembrance-ft-jhove',
    title: 'Remembrance (feat. Jhove)',
    artist: 'Jhove',
    file: "/r2-audio/lofi/10 Remembrance (ft. Jhove).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-softy-x-yasumu-since-that-night',
    title: 'Since That Night',
    artist: 'Softy x Yasumu',
    file: "/r2-audio/lofi/10 Softy x Yasumu - Since That Night.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-spacecraft-w-frumhere-master',
    title: 'Spacecraft (with Frumhere MASTER)',
    artist: 'Frumhere MASTER',
    file: "/r2-audio/lofi/10 Spacecraft w_ Frumhere MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-sweet-medicine-lushan-sun-kupla-master',
    title: 'Lushan Sun (Kupla Master)',
    artist: 'Sweet Medicine',
    file: "/r2-audio/lofi/10 Sweet Medicine - Lushan Sun (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-hollow-moon',
    title: ') Hollow Moon',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/10) Hollow Moon.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-visions-in-the-trees-ft-kanisan',
    title: ') Visions In The Trees Ft Kanisan',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/10) Visions In The Trees Ft Kanisan.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-bcalm-purrple-cat-hope',
    title: 'hope',
    artist: 'Bcalm _ Purrple Cat',
    file: "/r2-audio/lofi/10. Bcalm _ Purrple Cat - hope.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-casiio-sleepermane-folding-in-13lufs-final',
    title: 'Folding In -13lufs final',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/10. Casiio _ Sleepermane - Folding In -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-it-s-ok-master',
    title: 'It\'s ok (master)',
    artist: 'Various Artists',
    file: '/music/10. It\'s ok (master).mp3',
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-strangers',
    title: 'Strangers',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/10. Strangers.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-views-remaster-1',
    title: 'Views (Remaster) 1',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/10. Views (Remaster) 1.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-winter-breath-1',
    title: 'Winter, Breath (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/10. Winter, Breath (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '10-towerz-edelwize-ft-jhove-soft-hands',
    title: 'soft hands',
    artist: 'towerz _ edelwize ft. jhove',
    file: "/r2-audio/lofi/10. towerz _ edelwize ft. jhove - soft hands.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-ripples-ft-devon-rea',
    title: 'Ripples (ft. Devon Rea)',
    artist: '',
    file: "/r2-audio/lofi/11 - Ripples (ft. Devon Rea).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-after-dark',
    title: 'After Dark',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/11 After Dark.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-dontcry-x-nokiaa-became',
    title: 'Became',
    artist: 'Dontcry x Nokiaa',
    file: "/r2-audio/lofi/11 Dontcry x Nokiaa - Became.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-dryhope-wander-kupla-master',
    title: 'Wander (Kupla Master)',
    artist: 'Dryhope',
    file: "/r2-audio/lofi/11 Dryhope - Wander (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-ethereal-nights-master',
    title: 'Ethereal Nights MASTER',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/11 Ethereal Nights MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-laffey-simplicity-master-v1',
    title: 'Simplicity (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/11 Laffey - Simplicity (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-no-spirit-ascending-demo',
    title: 'Ascending (demo)',
    artist: 'No spirit',
    file: "/r2-audio/lofi/11 No spirit - Ascending (demo).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-project-aer-late-night-drive-master',
    title: 'Late Night Drive_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/11 Project AER - Late Night Drive_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-end-of-the-water-ft-l-dre',
    title: ') End Of The Water (feat. L.Dre)',
    artist: 'L.Dre',
    file: "/r2-audio/lofi/11) End Of The Water (Ft L.Dre).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-wake-up',
    title: ') Wake Up',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/11) Wake Up.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-bcalm-banks-no-spirit-your-eyes',
    title: 'your eyes',
    artist: 'Bcalm _ Banks _ No Spirit',
    file: "/r2-audio/lofi/11. Bcalm _ Banks _ No Spirit - your eyes.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-moonlight',
    title: 'Moonlight',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/11. Moonlight.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-snowfield-2',
    title: 'Snowfield (2)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/11. Snowfield (2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '11-towerz-edelwize-follow-me',
    title: 'follow me',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/11. towerz _ edelwize - follow me.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-blooming-dales-ft-diiolme',
    title: 'Blooming Dales (ft. Diiolme)',
    artist: '',
    file: "/r2-audio/lofi/12 - Blooming Dales (ft. Diiolme).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-kanisan-until-dawn-kupla-master-2-0',
    title: 'Until Dawn (Kupla Master 2.0)',
    artist: 'Kanisan',
    file: "/r2-audio/lofi/12 Kanisan - Until Dawn (Kupla Master 2.0).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-moonshine-w-hixon-foster-master',
    title: 'Moonshine (with Hixon Foster MASTER)',
    artist: 'Hixon Foster MASTER',
    file: "/r2-audio/lofi/12 Moonshine w_ Hixon Foster MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-no-spirit-exhale-master',
    title: 'Exhale (Master)',
    artist: 'No Spirit',
    file: "/r2-audio/lofi/12 No Spirit - Exhale (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-project-aer-songbird-master',
    title: 'Songbird_MASTER',
    artist: 'Project AER',
    file: "/r2-audio/lofi/12 Project AER - Songbird_MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-wayside',
    title: 'Wayside',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/12 Wayside.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-hm-surf-sleepy-melly',
    title: 'Sleepy Melly',
    artist: 'hm surf',
    file: "/r2-audio/lofi/12 hm surf - Sleepy Melly.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-floating',
    title: ') Floating',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/12) Floating.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-videotapes',
    title: ') Videotapes',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/12) Videotapes.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-bcalm-hendy-time',
    title: 'time',
    artist: 'Bcalm _ Hendy',
    file: "/r2-audio/lofi/12. Bcalm _ Hendy - time.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-my-ocean',
    title: 'My Ocean',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/12. My Ocean.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-that-s-us-2',
    title: 'That_s Us (2)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/12. That_s Us (2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '12-towerz-edelwize-ft-hi-jude-folding-house',
    title: 'folding house',
    artist: 'towerz _ edelwize ft. hi jude',
    file: "/r2-audio/lofi/12. towerz _ edelwize ft. hi jude - folding house.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-homecoming-ft-matchbox-youth',
    title: 'Homecoming (ft. Matchbox Youth)',
    artist: '',
    file: "/r2-audio/lofi/13 - Homecoming (ft. Matchbox Youth).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-lesky-x-waywell-lucid-nights',
    title: 'Lucid Nights',
    artist: 'LESKY x Waywell',
    file: "/r2-audio/lofi/13 LESKY x Waywell - Lucid Nights.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-orion-w-azayaka-master',
    title: 'Orion (with Azayaka MASTER)',
    artist: 'Azayaka MASTER',
    file: "/r2-audio/lofi/13 Orion w_ Azayaka MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-yestalgia-x-loafy-building-west-of-zhuhai-kupla-master',
    title: 'West Of Zhuhai (Kupla Master)',
    artist: 'Yestalgia X Loafy Building',
    file: "/r2-audio/lofi/13 Yestalgia X Loafy Building - West Of Zhuhai (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-forgotten-riddles-ft-kanisan',
    title: ') Forgotten Riddles Ft Kanisan',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/13) Forgotten Riddles Ft Kanisan.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-when-it-s-all-gone',
    title: ') When It_s All Gone',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/13) When It_s All Gone.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-august-now-again-2',
    title: 'August, Now Again (2)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/13. August, Now Again (2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-bcalm-cxlt-traces',
    title: 'traces',
    artist: 'Bcalm _ cxlt',
    file: "/r2-audio/lofi/13. Bcalm _ cxlt - traces.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-matcha-with-ruby',
    title: 'Matcha (feat. Ruby)',
    artist: 'Ruby',
    file: "/r2-audio/lofi/13. Matcha (with Ruby).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '13-towerz-edelwize-to-fall',
    title: 'to fall',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/13. towerz _ edelwize - to fall.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '14-bvg-the-path-you-choose-kupla-master',
    title: 'The Path You Choose (Kupla Master)',
    artist: 'BVG',
    file: "/r2-audio/lofi/14 BVG - The Path You Choose (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '14-mondo-loops-x-l-outlander-morning-dew',
    title: 'Morning Dew',
    artist: 'Mondo Loops x l_Outlander',
    file: "/r2-audio/lofi/14 Mondo Loops x l_Outlander - Morning Dew.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '14-moondrops-w-phlocalyst-master',
    title: 'Moondrops (with Phlocalyst MASTER)',
    artist: 'Phlocalyst MASTER',
    file: "/r2-audio/lofi/14 Moondrops w_ Phlocalyst MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '14-grounding-with-epifania',
    title: 'Grounding (feat. Epifania)',
    artist: 'Epifania',
    file: "/r2-audio/lofi/14. Grounding (with Epifania).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '14-places-i-remebered-feat-hoogway-3',
    title: 'Places I Remebered (feat. Hoogway)',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/14. Places I Remebered (feat. Hoogway) (3).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '14-towerz-edelwize-channel-67',
    title: 'channel 67',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/14. towerz _ edelwize - channel 67.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '15-constellations-master',
    title: 'Constellations MASTER',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/15 Constellations MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '15-no-spirit-x-no-spirit-choosing-you',
    title: 'Choosing You',
    artist: 'No Spirit x No Spirit',
    file: "/r2-audio/lofi/15 No Spirit x No Spirit - Choosing You.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '15-purrple-cat-neon-tiger-kupla-master',
    title: 'Neon Tiger (Kupla Master)',
    artist: 'Purrple Cat',
    file: "/r2-audio/lofi/15 Purrple Cat - Neon Tiger (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '15-drifter',
    title: 'Drifter',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/15. Drifter.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '15-lanterns-ft-towerz-1',
    title: 'Lanterns (feat. Towerz)',
    artist: 'Towerz',
    file: "/r2-audio/lofi/15. Lanterns (ft. Towerz) (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '16-otaam-x-c4c-tsuyu-kupla-master',
    title: 'Tsuyu (Kupla Master)',
    artist: 'Otaam x C4C',
    file: "/r2-audio/lofi/16 Otaam x C4C - Tsuyu (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '16-team-astro-last-call',
    title: 'Last Call_',
    artist: 'Team Astro',
    file: "/r2-audio/lofi/16 Team Astro - Last Call_.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '17-bvg-x-m-ndberg-waterfall-kupla-master',
    title: 'Waterfall (Kupla Master)',
    artist: 'BVG x møndberg',
    file: "/r2-audio/lofi/17 BVG x møndberg - Waterfall (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '17-bcalm-x-softy-x-banks-cozy',
    title: 'Cozy',
    artist: 'Bcalm x Softy x Banks',
    file: "/r2-audio/lofi/17 Bcalm x Softy x Banks - Cozy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '18-kaspa-x-piotr-wiese-baltic-sea-cruise',
    title: 'Baltic Sea Cruise',
    artist: 'Kaspa x Piotr Wiese',
    file: "/r2-audio/lofi/18 Kaspa x Piotr Wiese - Baltic Sea Cruise.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '18-phlocalyst-living-room-myr-ad-koi-kupla-master',
    title: 'Koi (Kupla Master)',
    artist: 'Phlocalyst _ Living Room _ Myríad',
    file: "/r2-audio/lofi/18 Phlocalyst _ Living Room _ Myríad - Koi (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '19-living-room-x-otaam-fuji-kupla-master',
    title: 'Fuji (Kupla Master)',
    artist: 'Living Room x Otaam',
    file: "/r2-audio/lofi/19 Living Room x Otaam - Fuji (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '19-loafy-building-x-amess-littlewood',
    title: 'Littlewood',
    artist: 'Loafy Building x Amess',
    file: "/r2-audio/lofi/19 Loafy Building x Amess - Littlewood.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '1-nostalgic',
    title: '° Nostalgic',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/1° Nostalgic.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-laffey-after-the-rain-master-v1',
    title: 'After The Rain (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/2 Laffey - After The Rain (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-laffey-x-softy-forest-friends-master-v1',
    title: 'Forest Friends (Master V1)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/2 Laffey x Softy - Forest Friends (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-pluto-ft-project-aer',
    title: 'Pluto ft Project Aer',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2 Pluto ft Project Aer .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-stellar-wind',
    title: 'Stellar Wind',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2 Stellar Wind.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-summer-eyes-w-no-spirit',
    title: 'Summer Eyes (w No Spirit)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2 Summer Eyes (w No Spirit).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-the-way-home',
    title: 'The Way Home',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2 The Way Home.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-mell-clocks-master',
    title: 'Clocks (MASTER)',
    artist: 'mell-ø',
    file: "/r2-audio/lofi/2 mell-ø - Clocks (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-rapid-eye-motion-with-wys',
    title: 'rapid eye motion with WYS',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2 rapid eye motion with WYS.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-above-skies-feat-h-1',
    title: ') Above Skies (feat. H.1)',
    artist: 'H.1',
    file: "/r2-audio/lofi/2) Above Skies (feat. H.1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-essence-of-the-forest-w-purple-cat',
    title: 'w Purple Cat',
    artist: ') Essence of the Forest',
    file: "/r2-audio/lofi/2) Essence of the Forest - w Purple Cat.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-letters-for-you',
    title: ') Letters for You',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2) Letters for You.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-mindeliq-neele-harder-walking-together',
    title: 'Walking Together',
    artist: ') Mindeliq _ Neele Harder',
    file: "/r2-audio/lofi/2) Mindeliq _ Neele Harder - Walking Together.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-amnesia',
    title: 'Amnesia',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Amnesia.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-an-enchanting-forest',
    title: 'An Enchanting Forest',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. An Enchanting Forest.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-aquamarine-horizon-w-mell-o',
    title: 'Aquamarine Horizon w mell-o',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Aquamarine Horizon w mell-o.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-bcalm-banks-hiraeth-final',
    title: 'Hiraeth (Final)',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/2. Bcalm _ Banks - Hiraeth (Final).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-bcalm-purrple-cat-skyblue',
    title: 'skyblue',
    artist: 'Bcalm _ Purrple Cat',
    file: "/r2-audio/lofi/2. Bcalm _ Purrple Cat - skyblue.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-casiio-sleepermane-patterns-13lufs',
    title: 'Patterns -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/2. Casiio _ Sleepermane - Patterns -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-childlike-wonder-master',
    title: 'Childlike Wonder (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Childlike Wonder (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-dream-surfers',
    title: 'Dream surfers',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Dream surfers.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-friday-night-with-you',
    title: 'Friday Night With You',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Friday Night With You.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-lost-tapes-2',
    title: 'Lost Tapes (2)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Lost Tapes (2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-overnight',
    title: 'Overnight',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Overnight.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-phlocalyst-mr-k-fer-promenades',
    title: 'Promenades',
    artist: 'Phlocalyst _ Mr. Käfer',
    file: "/r2-audio/lofi/2. Phlocalyst _ Mr. Käfer - Promenades.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-silver-lining-master',
    title: 'Silver Lining (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Silver Lining (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-the-place-where-i-belong-wav',
    title: 'The Place Where I Belong WAV',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. The Place Where I Belong WAV.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-viewpoint',
    title: 'Viewpoint',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Viewpoint.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-waterfall-with-elijah-lee',
    title: 'Waterfall (feat. Elijah Lee)',
    artist: 'Elijah Lee',
    file: "/r2-audio/lofi/2. Waterfall (with Elijah Lee).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-wishes-ft-nogymx-master',
    title: 'Wishes ft. Nogymx (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. Wishes ft. Nogymx (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-good-morning-love-ft-hoogway-master',
    title: 'good morning, love (feat. Hoogway)',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/2. good morning, love (ft. Hoogway) (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-hi-jude-morning-getaway',
    title: 'morning getaway',
    artist: 'hi jude',
    file: "/r2-audio/lofi/2. hi jude - morning getaway.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-iamalex-felty-kiss-me-feat-blossum',
    title: 'Kiss Me (Feat. Blossum)',
    artist: 'iamalex & Felty',
    file: "/r2-audio/lofi/2. iamalex & Felty - Kiss Me (Feat. Blossum) .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-rooftop-conversations-ft-nuver',
    title: 'rooftop conversations ft. Nuver',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2. rooftop conversations ft. Nuver.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-sleepermane-wallflower-13lufs-final',
    title: 'wallflower -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/2. sleepermane - wallflower -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-towerz-edelwize-ft-spencer-hunt-day-by-day',
    title: 'day by day',
    artist: 'towerz _ edelwize ft. spencer hunt',
    file: "/r2-audio/lofi/2. towerz _ edelwize ft. spencer hunt - day by day.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-where-light-can-t-reach-ft-sleepermane',
    title: 'where light can_t reach (feat. Sleepermane)',
    artist: 'Sleepermane',
    file: "/r2-audio/lofi/2. where light can_t reach (ft. Sleepermane).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-warm-country',
    title: 'Warm Country',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2.Warm Country.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '20-diiolme-x-l-outlander-arizona-night',
    title: 'Arizona Night',
    artist: 'Diiolme x l_Outlander',
    file: "/r2-audio/lofi/20 Diiolme x l_Outlander - Arizona Night.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '20-mondo-loops-danso-lullaby-w-softy-kupla-master',
    title: 'Danso Lullaby (w Softy) (Kupla MAster)',
    artist: 'Mondo Loops',
    file: "/r2-audio/lofi/20 Mondo Loops - Danso Lullaby (w Softy) (Kupla MAster).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '21-casiio-x-dontcry-sleeping-in',
    title: 'Sleeping In',
    artist: 'Casiio x Dontcry',
    file: "/r2-audio/lofi/21 Casiio x Dontcry - Sleeping In.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '21-jhove-high-sun-kupla-master',
    title: 'Jhove- High Sun (Kupla Master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/21 Jhove- High Sun (Kupla Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '22-hm-surf-fancy-brew',
    title: 'Fancy Brew',
    artist: 'hm surf',
    file: "/r2-audio/lofi/22 hm surf - Fancy Brew.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '23-sleepermane-x-sling-dilly-hue',
    title: 'Hue',
    artist: 'Sleepermane x Sling Dilly',
    file: "/r2-audio/lofi/23 Sleepermane x Sling Dilly - Hue.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '24-jhove-x-cxlt-take-me-far-away',
    title: 'take me far away',
    artist: 'jhove x cxlt.',
    file: "/r2-audio/lofi/24 jhove x cxlt. - take me far away.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '25-no-one-s-perfect-x-mondo-loops-ceres-calls',
    title: 'Ceres Calls',
    artist: 'no one_s perfect x Mondo Loops',
    file: "/r2-audio/lofi/25 no one_s perfect x Mondo Loops - Ceres Calls.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '26-kinissue-x-softy-x-redmatic-serenity',
    title: 'Serenity',
    artist: 'Kinissue x Softy x Redmatic',
    file: "/r2-audio/lofi/26 Kinissue x Softy x Redmatic - Serenity.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '2-mindfulness',
    title: '° Mindfulness',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/2° Mindfulness.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-laffey-hope-ft-scayos-master-v1',
    title: 'Hope ft. SCayos (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/3 Laffey - Hope ft. SCayos (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-laffey-x-softy-willow-master-v1',
    title: 'Willow (Master V1)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/3 Laffey x Softy - Willow (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-saturn',
    title: 'Saturn',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3 Saturn.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-seeing-beauty-in-everything',
    title: 'Seeing Beauty in Everything',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3 Seeing Beauty in Everything.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-solstice',
    title: 'Solstice',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3 Solstice.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-timepaint',
    title: 'Timepaint',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3 Timepaint.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-mell-alder-master',
    title: 'Alder (MASTER)',
    artist: 'mell-ø',
    file: "/r2-audio/lofi/3 mell-ø - Alder (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-pendulum-with-chris-mazuera',
    title: 'pendulum with Chris Mazuera',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3 pendulum with Chris Mazuera.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-don-t-hurt-yourself',
    title: ') Don_t Hurt Yourself',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3) Don_t Hurt Yourself.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-indigo-night',
    title: ') Indigo Night',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3) Indigo Night.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-kyoshi-ft-l-dre',
    title: ') Kyoshi (feat. L.Dre)',
    artist: 'L.Dre',
    file: "/r2-audio/lofi/3) Kyoshi (Ft L.Dre).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-mindeliq-neele-harder-ft-mondo-loops-shimmer',
    title: 'Shimmer',
    artist: ') Mindeliq _ Neele Harder (ft Mondo Loops)',
    file: "/r2-audio/lofi/3) Mindeliq _ Neele Harder (ft Mondo Loops) - Shimmer.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-are-we-still-dreaming',
    title: 'Are We Still Dreaming',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Are We Still Dreaming.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-bcalm-banks-bluebird-final',
    title: 'Bluebird (Final)',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/3. Bcalm _ Banks - Bluebird (Final).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-bcalm-banks-cutie',
    title: 'cutie',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/3. Bcalm _ Banks - cutie.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-broken-roads',
    title: 'Broken Roads',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Broken Roads.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-casiio-sleepermane-sequences-13lufs',
    title: 'Sequences -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/3. Casiio _ Sleepermane - Sequences -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-honestly-master',
    title: 'Honestly (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Honestly (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-just-another-day',
    title: 'Just Another Day',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Just Another Day.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-longing-master',
    title: 'Longing (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Longing (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-new-beginnings-master',
    title: 'New Beginnings (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. New Beginnings (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-notes-1',
    title: 'Notes (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Notes (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-phlocalyst-mr-k-fer-kukui-leaves',
    title: 'Kukui Leaves',
    artist: 'Phlocalyst _ Mr. Käfer',
    file: "/r2-audio/lofi/3. Phlocalyst _ Mr. Käfer - Kukui Leaves.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-rainy-day',
    title: 'Rainy Day',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Rainy Day.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-shivers',
    title: 'Shivers',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Shivers.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-the-clouds-stood-still-w-cxlt',
    title: 'The Clouds Stood Still w cxlt.',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. The Clouds Stood Still w cxlt..mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-vibrant-feelings',
    title: 'Vibrant feelings',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Vibrant feelings.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-water-lily',
    title: 'Water Lily',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. Water Lily.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-we-ll-be-alright-remaster-1',
    title: 'We_ll Be Alright (remaster) 1',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. We_ll Be Alright (remaster) 1.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-equinox',
    title: 'equinox',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. equinox.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-hi-jude-ocean-rays',
    title: 'ocean rays',
    artist: 'hi jude',
    file: "/r2-audio/lofi/3. hi jude - ocean rays.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-iamalex-felty-desert',
    title: 'Desert',
    artist: 'iamalex & Felty',
    file: "/r2-audio/lofi/3. iamalex & Felty - Desert.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-sleepermane-sundance-13lufs-final',
    title: 'sundance -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/3. sleepermane - sundance -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-soul-searching-master',
    title: 'soul searching (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. soul searching (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-timeless-gift-ft-hoogway-mastered',
    title: 'timeless gift ft. Hoogway mastered',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3. timeless gift ft. Hoogway mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-towerz-edelwize-reckless',
    title: 'reckless',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/3. towerz _ edelwize - reckless.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-summer-nights-ft-pandrezz',
    title: 'Summer Nights ft.Pandrezz',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3.Summer Nights ft.Pandrezz.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '3-point-me-home',
    title: '° Point Me Home',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/3° Point Me Home.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-field-trip',
    title: 'Field Trip',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4 Field Trip.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-laffey-honesty-master-v1',
    title: 'Honesty (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/4 Laffey - Honesty (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-laffey-x-softy-belonging-master-v1',
    title: 'Belonging (Master V1)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/4 Laffey x Softy - Belonging (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-shallow-pools',
    title: 'Shallow Pools',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4 Shallow Pools.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-twilight-ft-pointy-features',
    title: 'Twilight ft Pointy Features',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4 Twilight ft Pointy Features.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-vide',
    title: 'Vide',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4 Vide.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-equilibrium-with-arbour',
    title: 'equilibrium with Arbour',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4 equilibrium with Arbour.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-mell-x-no-one-s-perfect-forest-trails-master',
    title: 'Forest Trails (MASTER)',
    artist: 'mell-ø x no one_s perfect',
    file: "/r2-audio/lofi/4 mell-ø x no one_s perfect - Forest Trails (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-moonlight',
    title: ') Moonlight',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4) Moonlight.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-secret-forest-ft-softy',
    title: ') Secret Forest (Ft Softy_',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4) Secret Forest (Ft Softy_.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-when-i-m-gone',
    title: ') When I_m Gone',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4) When I_m Gone.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-mindeliq-neele-harder-birds-in-the-sky',
    title: 'Birds in the sky',
    artist: ')Mindeliq _ Neele Harder',
    file: "/r2-audio/lofi/4)Mindeliq _ Neele Harder - Birds in the sky.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-bcalm-banks-just-breathe-final',
    title: 'Just Breathe (Final)',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/4. Bcalm _ Banks - Just Breathe (Final).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-bcalm-purrple-cat-traveller',
    title: 'traveller',
    artist: 'Bcalm _ Purrple Cat',
    file: "/r2-audio/lofi/4. Bcalm _ Purrple Cat - traveller.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-blankets-master',
    title: 'Blankets (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Blankets (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-casiio-sleepermane-passing-by-13lufs',
    title: 'Passing By -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/4. Casiio _ Sleepermane - Passing By -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-coming-home',
    title: 'Coming Home',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Coming Home.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-crisp-breaths',
    title: 'Crisp Breaths',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Crisp Breaths.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-day-by-day-looking-for-you-feat-ambulo',
    title: 'Day by day, looking for you (feat. Ambulo)',
    artist: 'Ambulo',
    file: "/r2-audio/lofi/4. Day by day, looking for you (feat. Ambulo).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-fallin-night-remaster-3',
    title: 'Fallin Night (remaster) 3',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Fallin Night (remaster) 3.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-feelin-warm-1',
    title: 'Feelin Warm-1',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Feelin Warm-1.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-fields-1',
    title: 'Fields (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Fields (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-glowing-spirit-ft-amies',
    title: 'Glowing Spirit (feat. amies)',
    artist: 'amies',
    file: "/r2-audio/lofi/4. Glowing Spirit (ft. amies) .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-holiday-master',
    title: 'Holiday (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Holiday (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-meditations',
    title: 'Meditations',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Meditations.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-phlocalyst-mr-k-fer-sparkling-brooks',
    title: 'Sparkling Brooks',
    artist: 'Phlocalyst _ Mr. Käfer',
    file: "/r2-audio/lofi/4. Phlocalyst _ Mr. Käfer - Sparkling Brooks.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-pied-de-vent',
    title: 'Pied-de-vent',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Pied-de-vent.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-silhouettes-master',
    title: 'Silhouettes (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Silhouettes (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-sunrise',
    title: 'Sunrise',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. Sunrise.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-bloom-ft-krynoze-master',
    title: 'bloom (feat. Krynoze)',
    artist: 'Krynoze',
    file: "/r2-audio/lofi/4. bloom (ft. Krynoze) (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-hi-jude-seaside-park-feat-hoogway',
    title: 'seaside park (feat. hoogway)',
    artist: 'hi jude',
    file: "/r2-audio/lofi/4. hi jude - seaside park (feat. hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-iamalex-felty-fields-feat-jhove',
    title: 'Fields (Feat. Jhove)',
    artist: 'iamalex & Felty',
    file: "/r2-audio/lofi/4. iamalex & Felty - Fields (Feat. Jhove).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-puddles-ft-kainbeats',
    title: 'puddles ft. Kainbeats',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4. puddles ft. Kainbeats.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-sleepermane-in-between-cycles-13lufs-final',
    title: 'in between cycles -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/4. sleepermane - in between cycles -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-something-dear-ft-towerz',
    title: 'something dear (feat. Towerz)',
    artist: 'Towerz',
    file: "/r2-audio/lofi/4. something dear (ft. Towerz).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-towerz-edelwize-tomorrow-never-came',
    title: 'tomorrow never came',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/4. towerz _ edelwize - tomorrow never came.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-hamsin',
    title: 'Hamsin',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4.Hamsin.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4am-with-william-turner',
    title: 'am (feat. William Turner)',
    artist: 'William Turner',
    file: "/r2-audio/lofi/4am (with William Turner).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '4-raining-in-my-head',
    title: '° Raining In My Head',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/4° Raining In My Head.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-invisible-medicine-w-enluv',
    title: 'Invisible Medicine (w Enluv)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5 Invisible Medicine (w Enluv).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-laffey-old-photographs-ft-yutaka-hirasaka-master-v1',
    title: 'Old Photographs ft. Yutaka Hirasaka (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/5 Laffey - Old Photographs ft. Yutaka Hirasaka (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-laffey-x-softy-patience-master-v1',
    title: 'Patience (Master V1)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/5 Laffey x Softy - Patience (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-last-resort',
    title: 'Last Resort',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5 Last Resort.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-milky-way-ft-mondo-loops',
    title: 'Milky way ft Mondo Loops',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5 Milky way ft Mondo Loops.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-wilderness-ft-umbriel',
    title: 'Wilderness (feat. Umbriel)',
    artist: 'Umbriel',
    file: "/r2-audio/lofi/5 Wilderness (ft. Umbriel).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-marine-layer-with-delayde',
    title: 'marine layer with delayde',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5 marine layer with delayde.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-mell-x-mtch-currents-master',
    title: 'Currents (MASTER)',
    artist: 'mell-ø x mtch.',
    file: "/r2-audio/lofi/5 mell-ø x mtch. - Currents (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-chrono',
    title: ') Chrono',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5) Chrono.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-dream-on-feat-casiio',
    title: ') Dream On (feat. Casiio)',
    artist: 'Casiio',
    file: "/r2-audio/lofi/5) Dream On (feat. Casiio).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-have-hope',
    title: ') Have Hope',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5) Have Hope.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-mindeliq-neele-harder-ft-purrple-cat-afterglow',
    title: 'Afterglow',
    artist: ') Mindeliq _ Neele Harder( ft Purrple Cat)',
    file: "/r2-audio/lofi/5) Mindeliq _ Neele Harder( ft Purrple Cat) - Afterglow.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-bcalm-banks-gentle-hills-final',
    title: 'Gentle Hills (Final)',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/5. Bcalm _ Banks - Gentle Hills (Final).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-bcalm-banks-rose-fields',
    title: 'rose fields',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/5. Bcalm _ Banks - rose fields.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-blindfold',
    title: 'Blindfold',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Blindfold.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-bright-lights-master',
    title: 'Bright Lights (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Bright Lights (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-casiio-sleepermane-aries-13lufs',
    title: 'Aries -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/5. Casiio _ Sleepermane - Aries -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-daisies-with-phlocalyst',
    title: 'Daisies (feat. Phlocalyst)',
    artist: 'Phlocalyst',
    file: "/r2-audio/lofi/5. Daisies (with Phlocalyst).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-dawn-rain-1',
    title: 'Dawn Rain (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Dawn Rain (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-dreamways',
    title: 'Dreamways',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Dreamways.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-first-night-master',
    title: 'First Night (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. First Night (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-honour-feat-sitting-duck-c-e-c-e-l-i-e',
    title: 'Honour (feat. Sitting Duck _ c e c e l i e)',
    artist: 'Sitting Duck _ c e c e l i e',
    file: "/r2-audio/lofi/5. Honour (feat. Sitting Duck _ c e c e l i e).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-lazy-afternoon',
    title: 'Lazy Afternoon',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Lazy Afternoon.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-luminescence',
    title: 'Luminescence',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Luminescence.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-memory-lane-master',
    title: 'Memory Lane (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Memory Lane (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-orange-leaves',
    title: 'Orange Leaves',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. Orange Leaves.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-pandrezz-misty-village',
    title: 'Misty Village',
    artist: 'Pandrezz',
    file: "/r2-audio/lofi/5. Pandrezz - Misty Village.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-phlocalyst-mr-k-fer-time-of-the-day',
    title: 'Time of the Day',
    artist: 'Phlocalyst _ Mr. Käfer',
    file: "/r2-audio/lofi/5. Phlocalyst _ Mr. Käfer - Time of the Day.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-suddenly-the-fire-feat-kanisan',
    title: 'Suddenly, the fire (feat. Kanisan)',
    artist: 'Kanisan',
    file: "/r2-audio/lofi/5. Suddenly, the fire (feat Kanisan).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-beauty-in-everything',
    title: 'beauty in everything',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. beauty in everything.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-hi-jude-shadowed-days-feat-towerz-edelwize',
    title: 'shadowed days (feat. Towerz _ edelwize)',
    artist: 'hi jude',
    file: "/r2-audio/lofi/5. hi jude - shadowed days (feat. Towerz _ edelwize).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-iamalex-felty-on-a-cloud',
    title: 'On A Cloud',
    artist: 'iamalex & Felty',
    file: "/r2-audio/lofi/5. iamalex & Felty - On A Cloud.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-looking-at-the-moon-master',
    title: 'looking at the moon (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. looking at the moon (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-lustre',
    title: 'lustre',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5. lustre.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-sleepermane-felt-13lufs-final',
    title: 'felt -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/5. sleepermane - felt -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-towerz-edelwize-ft-spencer-hunt-in-the-cold',
    title: 'in the cold',
    artist: 'towerz _ edelwize ft. spencer hunt',
    file: "/r2-audio/lofi/5. towerz _ edelwize ft. spencer hunt - in the cold.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-city-on-a-hill',
    title: 'City On A Hill',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5.City On A Hill.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '5-nuit-blanche',
    title: '° Nuit Blanche',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/5° Nuit Blanche.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-cail-n',
    title: 'Cailín',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6 Cailín.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-dreamsand-w-ambulo',
    title: 'Dreamsand (w Ambulo)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6 Dreamsand (w Ambulo).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-epok',
    title: 'Epok',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6 Epok.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-interstellar-ft-soitchy',
    title: 'Interstellar ft Soitchy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6 Interstellar ft Soitchy .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-laffey-a-wave-in-the-ocean-master-v1',
    title: 'A Wave in the Ocean (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/6 Laffey - A Wave in the Ocean (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-laffey-x-softy-teardrops-master-v2',
    title: 'Teardrops (Master V2)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/6 Laffey x Softy - Teardrops (Master V2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-junegloom-with-blurred-figures',
    title: 'junegloom with blurred figures',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6 junegloom with blurred figures.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-mell-away-from-home-master',
    title: 'Away from Home (MASTER)',
    artist: 'mell-ø',
    file: "/r2-audio/lofi/6 mell-ø - Away from Home (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-i-m-sorry',
    title: ') I_m Sorry',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6) I_m Sorry.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-mondo-loops-x-wys-mastered',
    title: ') Mondo Loops X WYS (mastered)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6) Mondo Loops X WYS (mastered) .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-timeshift',
    title: ') Timeshift',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6) Timeshift.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-mindeliq-neele-harder-hidden-path',
    title: 'Hidden Path',
    artist: ')Mindeliq _ Neele Harder',
    file: "/r2-audio/lofi/6)Mindeliq _ Neele Harder - Hidden Path.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-allow-yourself-to-be-wrong-feat-mondo-loops',
    title: 'Allow yourself to be wrong (feat. Mondo Loops)',
    artist: 'Mondo Loops',
    file: "/r2-audio/lofi/6. Allow yourself to be wrong (feat. Mondo Loops).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-bcalm-banks-ft-purrple-cat-i-ll-be-there',
    title: 'I_ll Be There',
    artist: 'Bcalm _ Banks (ft. Purrple Cat)',
    file: "/r2-audio/lofi/6. Bcalm _ Banks (ft. Purrple Cat) - I_ll Be There.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-bcalm-banks-mondo-loops-pebbles',
    title: 'pebbles',
    artist: 'Bcalm _ Banks _ Mondo Loops',
    file: "/r2-audio/lofi/6. Bcalm _ Banks _ Mondo Loops - pebbles.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-casiio-sleepermane-wings-13lufs',
    title: 'Wings -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/6. Casiio _ Sleepermane - Wings -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-clear-blue-sky-master',
    title: 'Clear Blue Sky (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Clear Blue Sky (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-could-have-done-more',
    title: 'Could Have Done More',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Could Have Done More.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-down-in-the-valley-feat-theo-aabel',
    title: 'Down In The Valley (feat. Theo Aabel)',
    artist: 'Theo Aabel',
    file: "/r2-audio/lofi/6. Down In The Valley (feat. Theo Aabel).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-gentle-zephyr',
    title: 'Gentle Zephyr',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Gentle Zephyr.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-haze-1',
    title: 'Haze (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Haze (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-neighborhood-master',
    title: 'Neighborhood (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Neighborhood (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-open-window-or-unpacking-master',
    title: 'Open Window or Unpacking (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Open Window or Unpacking (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-phlocalyst-mr-k-fer-life-aquatic-ft-ak-n',
    title: 'Life Aquatic (ft. Akīn)',
    artist: 'Phlocalyst _ Mr. Käfer',
    file: "/r2-audio/lofi/6. Phlocalyst _ Mr. Käfer - Life Aquatic (ft. Akīn).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-reflection-in-the-water',
    title: 'Reflection In The Water',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Reflection In The Water .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-sunup',
    title: 'Sunup',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Sunup.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-time-passing',
    title: 'Time Passing',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Time Passing.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-wandering-with-epifania',
    title: 'Wandering (feat. Epifania)',
    artist: 'Epifania',
    file: "/r2-audio/lofi/6. Wandering (with Epifania).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-water-mirros',
    title: 'Water Mirros',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. Water Mirros.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-faraway-ft-antonius-b-master',
    title: 'faraway (feat. Antonius B)',
    artist: 'Antonius B',
    file: "/r2-audio/lofi/6. faraway (ft. Antonius B) (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-hi-jude-lazy-river',
    title: 'lazy river',
    artist: 'hi jude',
    file: "/r2-audio/lofi/6. hi jude - lazy river.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-iamalex-felty-sunday-sleeping',
    title: 'Sunday Sleeping',
    artist: 'iamalex & Felty',
    file: "/r2-audio/lofi/6. iamalex & Felty - Sunday Sleeping.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-lovely-glow',
    title: 'lovely glow',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. lovely glow.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-lucidity',
    title: 'lucidity',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6. lucidity.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-sleepermane-gravity-well-13lufs-final',
    title: 'gravity well -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/6. sleepermane - gravity well -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-towerz-edelwize-trusting-hands',
    title: 'trusting hands',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/6. towerz _ edelwize - trusting hands.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-soul-searching',
    title: 'Soul Searching',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6.Soul Searching.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '6-silent-emotions',
    title: '° Silent Emotions',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/6° Silent Emotions.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-autumn-light-ft-mondo-loops',
    title: 'Autumn Light (feat. Mondo Loops)',
    artist: 'Mondo Loops',
    file: "/r2-audio/lofi/7 Autumn Light (ft. Mondo Loops).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-laffey-letting-go-ft-b9-master-v1',
    title: 'Letting Go ft. B9 (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/7 Laffey - Letting Go ft. B9 (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-laffey-x-softy-beyond-master-v2',
    title: 'Beyond (Master V2)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/7 Laffey x Softy - Beyond (Master V2).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-nebula',
    title: 'Nebula',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7 Nebula.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-mell-x-osaki-northern-lights-master',
    title: 'Northern Lights (MASTER)',
    artist: 'mell-ø x Osaki',
    file: "/r2-audio/lofi/7 mell-ø x Osaki - Northern Lights (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-closer',
    title: ') Closer',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7) Closer.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-mindeliq-neele-harder-ft-pueblo-vista-moon-garden',
    title: 'Moon Garden',
    artist: ') Mindeliq _ Neele Harder (ft.Pueblo Vista)',
    file: "/r2-audio/lofi/7) Mindeliq _ Neele Harder (ft.Pueblo Vista) - Moon Garden.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-november',
    title: ') November',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7) November.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-old-dee-ft-kanisan',
    title: ') Old Dee Ft Kanisan',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7) Old Dee Ft Kanisan.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-and-december-feat-banks-1',
    title: 'And December (feat. Banks)',
    artist: 'Banks',
    file: "/r2-audio/lofi/7. And December (feat. Banks) (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-bcalm-banks-ft-cxlt-yours-final',
    title: 'Yours (Final)',
    artist: 'Bcalm _ Banks (ft. cxlt)',
    file: "/r2-audio/lofi/7. Bcalm _ Banks (ft. cxlt) - Yours (Final).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-bcalm-hoogway-within',
    title: 'within',
    artist: 'Bcalm _ Hoogway',
    file: "/r2-audio/lofi/7. Bcalm _ Hoogway - within.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-beginner-ft-kronomuzik',
    title: 'Beginner (feat. Kronomuzik)',
    artist: 'Kronomuzik',
    file: "/r2-audio/lofi/7. Beginner (ft Kronomuzik).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-by-the-creek',
    title: 'By the Creek',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. By the Creek.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-casiio-sleepermane-nomads-13lufs',
    title: 'Nomads -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/7. Casiio _ Sleepermane - Nomads -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-from-midnight-remaster-2',
    title: 'From Midnight (remaster) 2',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. From Midnight (remaster) 2.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-get-back-home-feat-hevi',
    title: 'Get Back Home (feat. Hevi)',
    artist: 'Hevi',
    file: "/r2-audio/lofi/7. Get Back Home (feat. Hevi).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-keep-in-touch-feat-sweet-medicine',
    title: 'Keep in touch (feat. Sweet Medicine)',
    artist: 'Sweet Medicine',
    file: "/r2-audio/lofi/7. Keep in touch (feat. Sweet Medicine).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-misty',
    title: 'Misty',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. Misty.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-shine-on-ft-cloud-break',
    title: 'Shine On (feat. Cloud Break)',
    artist: 'Cloud Break',
    file: "/r2-audio/lofi/7. Shine On (ft. Cloud Break) .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-sweet-tears',
    title: 'Sweet Tears',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. Sweet Tears.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-warm-updrafts',
    title: 'Warm Updrafts',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. Warm Updrafts.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-whispers-test-master',
    title: 'Whispers (test master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. Whispers (test master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-come-closer-master',
    title: 'come closer (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. come closer (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-fireflies-ft-dimension-32',
    title: 'fireflies ft. Dimension 32',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7. fireflies ft. Dimension 32.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-iamalex-felty-far-from-home',
    title: 'Far From Home',
    artist: 'iamalex & Felty',
    file: "/r2-audio/lofi/7. iamalex & Felty - Far From Home.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-sleepermane-everlasting-13lufs-final',
    title: 'everlasting -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/7. sleepermane - everlasting -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-towerz-edelwize-ft-umbriel-at-long-last',
    title: 'at long last',
    artist: 'towerz _ edelwize ft. umbriel',
    file: "/r2-audio/lofi/7. towerz _ edelwize ft. umbriel - at long last.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-forever-young-ft-hoogway',
    title: 'Forever Young ft.hoogway',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7.Forever Young ft.hoogway.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '7-amnesia',
    title: '° Amnesia',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/7° Amnesia.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-laffey-set-sail-master-v1',
    title: 'Set Sail (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/8 Laffey - Set Sail (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-laffey-x-softy-gentle-master-v1',
    title: 'Gentle (Master V1)',
    artist: 'Laffey x Softy',
    file: "/r2-audio/lofi/8 Laffey x Softy - Gentle (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-riverside-ft-towerz',
    title: 'Riverside (feat. Towerz)',
    artist: 'Towerz',
    file: "/r2-audio/lofi/8 Riverside (ft. Towerz).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-time-alone',
    title: 'Time Alone',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8 Time Alone.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-mell-x-ambulo-passage-master',
    title: 'Passage (MASTER)',
    artist: 'mell-ø x Ambulo',
    file: "/r2-audio/lofi/8 mell-ø x Ambulo - Passage (MASTER).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-a-journey-in-the-dark',
    title: ') A Journey In The Dark',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8) A Journey In The Dark.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-frames',
    title: ') Frames',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8) Frames.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-leaves',
    title: ') Leaves',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8) Leaves.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-bcalm-banks-back-then-final',
    title: 'Back Then (Final)',
    artist: 'Bcalm _ Banks',
    file: "/r2-audio/lofi/8. Bcalm _ Banks - Back Then (Final).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-bcalm-kainbeats-signals',
    title: 'signals',
    artist: 'Bcalm _ Kainbeats',
    file: "/r2-audio/lofi/8. Bcalm _ Kainbeats - signals.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-casiio-sleepermane-gemini-13lufs',
    title: 'Gemini -13lufs',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/8. Casiio _ Sleepermane - Gemini -13lufs.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-close-your-eyes',
    title: 'Close Your Eyes',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8. Close Your Eyes.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-frontseat',
    title: 'Frontseat',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8. Frontseat.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-goodbye-my-friend-feat-hoogway',
    title: 'Goodbye my friend (feat. Hoogway)',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/8. Goodbye my friend (feat. Hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-limitless-heights',
    title: 'Limitless Heights',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8. Limitless Heights.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-monday-with-sebastian-kamae',
    title: 'Monday (feat. Sebastian Kamae)',
    artist: 'Sebastian Kamae',
    file: "/r2-audio/lofi/8. Monday (with Sebastian Kamae).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-single-star',
    title: 'Single Star',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8. Single Star.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-sleep-no-more-1',
    title: 'Sleep no more (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8. Sleep no more (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-soft-breeze-master',
    title: 'Soft Breeze (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8. Soft Breeze (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-tabal-x-blumen-take-care',
    title: 'Take Care',
    artist: 'TABAL x Blumen',
    file: "/r2-audio/lofi/8. TABAL x Blumen - Take Care.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-mahogany-ft-mondo-loops',
    title: 'mahogany ft. Mondo Loops',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8. mahogany ft. Mondo Loops.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-sleepermane-eris-13lufs-final',
    title: 'eris -13lufs final',
    artist: 'sleepermane',
    file: "/r2-audio/lofi/8. sleepermane - eris -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-towerz-edelwize-mayflower',
    title: 'mayflower',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/8. towerz _ edelwize - mayflower.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-your-eyes-ft-jinsei-sam-cross-master',
    title: 'your eyes (feat. JinSei & Sam Cross)',
    artist: 'JinSei & Sam Cross',
    file: "/r2-audio/lofi/8. your eyes (ft. JinSei & Sam Cross) (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '8-lunar-rotations',
    title: '° Lunar Rotations',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/8° Lunar Rotations.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-by-candle-light-ft-towerz-umbriel',
    title: 'By Candle Light (feat. Towerz _ Umbriel)',
    artist: 'Towerz _ Umbriel',
    file: "/r2-audio/lofi/9 By Candle Light (ft. Towerz _ Umbriel).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-laffey-sun-rays-ft-towerz-master-v1',
    title: 'Sun Rays ft. Towerz (Master V1)',
    artist: 'Laffey',
    file: "/r2-audio/lofi/9 Laffey - Sun Rays ft. Towerz (Master V1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-blurry',
    title: ') Blurry',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9) Blurry.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-treasures-in-the-cave-ft-softy',
    title: ') Treasures In The Cave Ft Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9) Treasures In The Cave Ft Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-would-i-see-tomorrow',
    title: ') Would I See Tomorrow',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9) Would I See Tomorrow.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-about-the-memory-1',
    title: 'About the Memory (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9. About the Memory (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-bcalm-banks-purrple-cat-daisy',
    title: 'daisy',
    artist: 'Bcalm _ Banks _ Purrple Cat',
    file: "/r2-audio/lofi/9. Bcalm _ Banks _ Purrple Cat - daisy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-blue-eyes-remaster-1',
    title: 'Blue Eyes (Remaster) 1',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9. Blue Eyes (Remaster) 1.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-casiio-sleepermane-oasis-13lufs-final',
    title: 'Oasis -13lufs final',
    artist: 'Casiio _ Sleepermane',
    file: "/r2-audio/lofi/9. Casiio _ Sleepermane - Oasis -13lufs final.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-floating-sanctuary',
    title: 'Floating Sanctuary',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9. Floating Sanctuary.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-liberate-master',
    title: 'Liberate (master)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9. Liberate (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-lonely-friday-night',
    title: 'Lonely Friday Night',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9. Lonely Friday Night.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-rainfall',
    title: 'Rainfall',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9. Rainfall.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-time-to-dream',
    title: 'Time To Dream',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9. Time To Dream.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-station-to-station-ft-banks-bcalm-master',
    title: 'station to station (feat. Banks & Bcalm)',
    artist: 'Banks & Bcalm',
    file: "/r2-audio/lofi/9. station to station (ft. Banks & Bcalm) (master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-towerz-edelwize-sandscape',
    title: 'sandscape',
    artist: 'towerz _ edelwize',
    file: "/r2-audio/lofi/9. towerz _ edelwize - sandscape.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '94-new',
    title: 'new',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/94 new.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: '9-night-vision',
    title: '° Night Vision',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/9° Night Vision.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'adanel',
    title: 'Adanel',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Adanel.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'alley-of-trees-x-softy',
    title: 'Alley Of Trees x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Alley Of Trees x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'amber-w-philip-somber',
    title: 'Amber w Philip Somber',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Amber w Philip Somber.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'aura',
    title: 'Aura',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Aura.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-the-other-side',
    title: 'The Other Side',
    artist: 'BVG',
    file: "/r2-audio/lofi/BVG - The Other Side.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-tibeauthetraveler-moon-lake',
    title: 'Moon Lake',
    artist: 'BVG x Tibeauthetraveler',
    file: "/r2-audio/lofi/BVG x Tibeauthetraveler - Moon Lake.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-trix-letting-go-ft-m-ndberg',
    title: 'Letting Go (ft.møndberg)',
    artist: 'BVG x Trix.',
    file: "/r2-audio/lofi/BVG x Trix. - Letting Go (ft.møndberg).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-m-ndberg-distant-voices',
    title: 'Distant Voices',
    artist: 'BVG x møndberg',
    file: "/r2-audio/lofi/BVG x møndberg - Distant Voices.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-m-ndberg-memories',
    title: 'Memories',
    artist: 'BVG x møndberg',
    file: "/r2-audio/lofi/BVG x møndberg - Memories.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-m-ndberg-sands-of-time',
    title: 'Sands Of Time',
    artist: 'BVG x møndberg',
    file: "/r2-audio/lofi/BVG x møndberg - Sands Of Time.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-m-ndberg-serenity',
    title: 'Serenity',
    artist: 'BVG x møndberg',
    file: "/r2-audio/lofi/BVG x møndberg - Serenity.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-m-ndberg-solemn-winds',
    title: 'Solemn Winds',
    artist: 'BVG x møndberg',
    file: "/r2-audio/lofi/BVG x møndberg - Solemn Winds.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bvg-x-m-ndberg-wisdom',
    title: 'Wisdom',
    artist: 'BVG x møndberg',
    file: "/r2-audio/lofi/BVG x møndberg - Wisdom.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'beacon',
    title: 'Beacon',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Beacon.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'before-you-fall-asleep-with-h-1',
    title: 'Before You Fall Asleep (with H.1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Before You Fall Asleep (with H.1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'being-together-ft-tibeauthetraveller',
    title: 'Being Together (ft Tibeauthetraveller)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Being Together (ft Tibeauthetraveller).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bird-watcher',
    title: 'Bird Watcher',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Bird Watcher.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'blossom-x-nowun',
    title: 'Blossom x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Blossom x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'breakaway',
    title: 'Breakaway',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Breakaway.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'brighter-days-ft-softy',
    title: 'Brighter Days ft Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Brighter Days ft Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'butterflies',
    title: 'Butterflies',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Butterflies.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-heart-of-the-sea',
    title: 'Heart of the Sea',
    artist: 'Charlee Nguyen X Mondo Loops',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops - Heart of the Sea.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-home',
    title: 'Home',
    artist: 'Charlee Nguyen X Mondo Loops',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops - Home.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-orion-s-belt-ft-purrple-cat',
    title: 'Orion_s Belt Ft. Purrple Cat',
    artist: 'Charlee Nguyen X Mondo Loops',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops - Orion_s Belt Ft. Purrple Cat.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-rapture',
    title: 'Rapture',
    artist: 'Charlee Nguyen X Mondo Loops',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops - Rapture.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-savior-ft-prithvi',
    title: 'Savior Ft. Prithvi',
    artist: 'Charlee Nguyen X Mondo Loops',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops - Savior Ft. Prithvi.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-sea-legs-ft-early-garden',
    title: 'Sea Legs Ft. Early Garden',
    artist: 'Charlee Nguyen X Mondo Loops',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops - Sea Legs Ft. Early Garden.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-starry-sea',
    title: 'Starry Sea',
    artist: 'Charlee Nguyen X Mondo Loops',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops - Starry Sea.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'charlee-nguyen-x-mondo-loops-ft-trxxshed-old-friend',
    title: 'Old Friend',
    artist: 'Charlee Nguyen X Mondo Loops Ft. Trxxshed',
    file: "/r2-audio/lofi/Charlee Nguyen X Mondo Loops Ft. Trxxshed - Old Friend.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-aquamarine',
    title: 'Aquamarine',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Aquamarine.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-bending-the-rules',
    title: 'Bending The Rules',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Bending The Rules.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-bottomless',
    title: 'Bottomless',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Bottomless.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-caimyar',
    title: 'Caimyar',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Caimyar.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-gullfoss',
    title: 'Gullfoss',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Gullfoss.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-lumiel',
    title: 'Lumiel',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Lumiel.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-mramor',
    title: 'Mramor',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Mramor.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-stars-on-the-roof',
    title: 'Stars on the Roof',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Stars on the Roof.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-sun-kissed',
    title: 'Sun Kissed',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Sun Kissed.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'chau-sara-weak-point',
    title: 'Weak Point',
    artist: 'Chau Sara',
    file: "/r2-audio/lofi/Chau Sara - Weak Point.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'circles-feat-kurt-stewart',
    title: 'Circles (feat. Kurt Stewart)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Circles (feat. Kurt Stewart).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'clouds',
    title: 'Clouds',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Clouds.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'divine',
    title: 'Divine',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Divine.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'dreaming',
    title: 'Dreaming',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Dreaming.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'dreamwalk',
    title: 'Dreamwalk',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Dreamwalk.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'drift-feat-no-one-s-perfect',
    title: 'Drift (feat. no one\'s perfect)',
    artist: 'Various Artists',
    file: '/music/Drift (feat. no one\'s perfect).mp3',
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'dusk-feat-lawrence-walther',
    title: 'Dusk (feat. Lawrence Walther)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Dusk (feat. Lawrence Walther).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'everything-we-need',
    title: 'Everything We Need',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Everything We Need.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'explore',
    title: 'Explore',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Explore.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'faded-hills-x-softy',
    title: 'Faded Hills x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Faded Hills x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'flash',
    title: 'Flash',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Flash.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'flying-away',
    title: 'Flying Away',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Flying Away.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'forbidden-love',
    title: 'Forbidden Love',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Forbidden Love.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'forgotten-rite',
    title: 'Forgotten Rite',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Forgotten Rite.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'frozen-waters-x-softy',
    title: 'Frozen Waters x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Frozen Waters x Softy .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'garden',
    title: 'Garden',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Garden.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'golden-lakes-x-softy',
    title: 'Golden Lakes x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Golden Lakes x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'graze',
    title: 'Graze',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Graze.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'haze-x-nowun',
    title: 'Haze x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Haze x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'heart-mastered',
    title: 'Heart Mastered',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Heart Mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-city-blue',
    title: 'City Blue',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - City Blue.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-favorite-band-x-wys',
    title: 'Favorite Band x WYS',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Favorite Band x WYS.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-fly-high-x-cxlt',
    title: 'Fly High x Cxlt',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Fly High x Cxlt.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-green-field',
    title: 'Green Field',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Green Field.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-horizon-x-dyrean',
    title: 'Horizon x Dyrean',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Horizon x Dyrean.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-inner-echoes',
    title: 'Inner Echoes',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Inner Echoes.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-left-unsaid',
    title: 'Left Unsaid',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Left Unsaid.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-old-friend',
    title: 'Old Friend',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Old Friend.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-orange-sea',
    title: 'Orange Sea',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Orange Sea.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-tall-birds',
    title: 'Tall Birds',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Tall Birds.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hoogway-thin-lines',
    title: 'Thin Lines',
    artist: 'Hoogway',
    file: "/r2-audio/lofi/Hoogway - Thin Lines.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'i-cant-do-this-anymore',
    title: 'I cant do this anymore',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/I cant do this anymore.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'inhale-x-nowun',
    title: 'Inhale x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Inhale x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'isolated',
    title: 'Isolated',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Isolated.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'just-wait-x-nowun',
    title: 'Just Wait x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Just Wait x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'kayou-beyond',
    title: 'Beyond',
    artist: 'Kayou.',
    file: "/r2-audio/lofi/Kayou. - Beyond.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'kayou-daydream',
    title: 'Daydream',
    artist: 'Kayou.',
    file: "/r2-audio/lofi/Kayou. - Daydream.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'kayou-horizon',
    title: 'Horizon',
    artist: 'Kayou.',
    file: "/r2-audio/lofi/Kayou. - Horizon.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'kayou-sanctuary',
    title: 'Sanctuary',
    artist: 'Kayou.',
    file: "/r2-audio/lofi/Kayou. - Sanctuary.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'kayou-spark',
    title: 'Spark',
    artist: 'Kayou.',
    file: "/r2-audio/lofi/Kayou. - Spark.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'keep-you-safe-x-nowun',
    title: 'Keep You Safe x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Keep You Safe x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'late-signs-x-nowun',
    title: 'Late Signs x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Late Signs x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'life-without-you-ft-jisatsu-and-no-spirit',
    title: 'Life without you (ft Jisatsu and No Spirit)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Life without you (ft Jisatsu and No Spirit).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-ak-n-shorebreak-master',
    title: 'Shorebreak MASTER',
    artist: 'Living Room ft. Akīn',
    file: "/r2-audio/lofi/Living Room ft. Akīn - Shorebreak MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-epona-another-beautiful-day-master',
    title: 'Another Beautiful Day MASTER',
    artist: 'Living Room ft. Epona',
    file: "/r2-audio/lofi/Living Room ft. Epona - Another Beautiful Day MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-hoogway-slow-your-mind-master',
    title: 'Slow Your Mind MASTER',
    artist: 'Living Room ft. Hoogway',
    file: "/r2-audio/lofi/Living Room ft. Hoogway - Slow Your Mind MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-mondo-loops-oceansplash-master',
    title: 'Oceansplash MASTER',
    artist: 'Living Room ft. Mondo Loops',
    file: "/r2-audio/lofi/Living Room ft. Mondo Loops - Oceansplash MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-otaam-morning-sun-master',
    title: 'Morning Sun MASTER',
    artist: 'Living Room ft. Otaam',
    file: "/r2-audio/lofi/Living Room ft. Otaam - Morning Sun MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-phlocalyst-inspired-by-ocean-master',
    title: 'Inspired by Ocean MASTER',
    artist: 'Living Room ft. Phlocalyst',
    file: "/r2-audio/lofi/Living Room ft. Phlocalyst - Inspired by Ocean MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-screen-jazzmaster-ft-mondo-loops-juli-master',
    title: 'Juli MASTER',
    artist: 'Living Room ft. Screen Jazzmaster ft. Mondo Loops',
    file: "/r2-audio/lofi/Living Room ft. Screen Jazzmaster ft. Mondo Loops - Juli MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-viktor-minsky-after-the-rainbow-master',
    title: 'After The Rainbow MASTER',
    artist: 'Living Room ft. Viktor Minsky',
    file: "/r2-audio/lofi/Living Room ft. Viktor Minsky - After The Rainbow MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-viktor-minsky-champs-de-lavande-master',
    title: 'Champs de Lavande MASTER',
    artist: 'Living Room ft. Viktor Minsky',
    file: "/r2-audio/lofi/Living Room ft. Viktor Minsky - Champs de Lavande MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-ft-viktor-minsky-flow-master',
    title: 'Flow MASTER',
    artist: 'Living Room ft. Viktor Minsky',
    file: "/r2-audio/lofi/Living Room ft. Viktor Minsky - Flow MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-akin-moonflowers-master',
    title: 'Moonflowers MASTER',
    artist: 'Living Room x Akin',
    file: "/r2-audio/lofi/Living Room x Akin - Moonflowers MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-elior-northern-tales-master2',
    title: 'Northern Tales MASTER2',
    artist: 'Living Room x Elior',
    file: "/r2-audio/lofi/Living Room x Elior - Northern Tales MASTER2.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-hoogway-whispering-master',
    title: 'Whispering Master',
    artist: 'Living Room x Hoogway',
    file: "/r2-audio/lofi/Living Room x Hoogway - Whispering Master.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-jam-addict-waving-master',
    title: 'Waving MASTER',
    artist: 'Living Room x Jam_addict',
    file: "/r2-audio/lofi/Living Room x Jam_addict - Waving MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-mell-o-the-night-is-full-of-wonders-master',
    title: 'The Night Is Full Of Wonders MASTER',
    artist: 'Living Room x Mell-o',
    file: "/r2-audio/lofi/Living Room x Mell-o - The Night Is Full Of Wonders MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-mondo-loops-friendship-master',
    title: 'Friendship MASTER',
    artist: 'Living Room x Mondo Loops',
    file: "/r2-audio/lofi/Living Room x Mondo Loops - Friendship MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-mondo-loops-movie-master',
    title: 'Movie MASTER',
    artist: 'Living Room x Mondo Loops',
    file: "/r2-audio/lofi/Living Room x Mondo Loops - Movie MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-mondo-loops-purple-sky-master',
    title: 'Purple Sky MASTER',
    artist: 'Living Room x Mondo Loops',
    file: "/r2-audio/lofi/Living Room x Mondo Loops - Purple Sky MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-mondo-loops-seven-master',
    title: 'Seven MASTER',
    artist: 'Living Room x Mondo Loops',
    file: "/r2-audio/lofi/Living Room x Mondo Loops - Seven MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-otaam-big-dreams-master',
    title: 'Big Dreams MASTER',
    artist: 'Living Room x Otaam',
    file: "/r2-audio/lofi/Living Room x Otaam - Big Dreams MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-phlocalyst-bright-future-master-1',
    title: 'Bright Future MASTER (1)',
    artist: 'Living Room x Phlocalyst',
    file: "/r2-audio/lofi/Living Room x Phlocalyst - Bright Future MASTER (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-rosoul-x-viktor-minsky-prayer-master',
    title: 'Prayer MASTER',
    artist: 'Living Room x Rosoul x Viktor Minsky',
    file: "/r2-audio/lofi/Living Room x Rosoul x Viktor Minsky - Prayer MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'living-room-x-viktor-minsky-after-sunset-master',
    title: 'After Sunset MASTER',
    artist: 'Living Room x Viktor Minsky',
    file: "/r2-audio/lofi/Living Room x Viktor Minsky - After Sunset MASTER.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'lockdown',
    title: 'Lockdown',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Lockdown.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'looking-back-feat-mondo-loops',
    title: 'Looking Back (feat. Mondo Loops)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Looking Back (feat. Mondo Loops).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'lost-in-thought',
    title: 'Lost in Thought',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Lost in Thought.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'lune-x-softy',
    title: 'Lune x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Lune x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'memories',
    title: 'Memories',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Memories.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'mirror-lake',
    title: 'Mirror Lake',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Mirror Lake.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'mirrors-of-our-sky',
    title: 'Mirrors of our Sky',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Mirrors of our Sky.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'moments-to-keep',
    title: 'Moments To Keep',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Moments To Keep.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'morning-brew-feat-paper-ocean',
    title: 'Morning Brew (feat. Paper Ocean)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Morning Brew (feat. Paper Ocean).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'morning-sun-x-nowun',
    title: 'Morning Sun x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Morning Sun x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'my-memoir',
    title: 'My Memoir',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/My Memoir.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'namida',
    title: 'Namida',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Namida.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'no-one-s-perfect-flower-fields-feat-kanisan',
    title: 'Flower Fields (feat. Kanisan)',
    artist: 'No one_s perfect',
    file: "/r2-audio/lofi/No one_s perfect - Flower Fields (feat. Kanisan).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'nuages-x-softy',
    title: 'Nuages x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Nuages x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'oh-buddy',
    title: 'Oh, Buddy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Oh, Buddy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'only-you-x-softy',
    title: 'Only You x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Only You x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'open-skies',
    title: 'Open Skies',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Open Skies.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'pathfinder',
    title: 'Pathfinder',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Pathfinder.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'pleine-lune-ft-dimension-32-silence-removed-from-start',
    title: 'Pleine Lune (ft. Dimension 32) (silence removed from start)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Pleine Lune (ft. Dimension 32) (silence removed from start).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-balanced-contrast',
    title: 'Balanced Contrast',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Balanced Contrast.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-blue-dawn',
    title: 'Blue Dawn',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Blue Dawn.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-calling-from-above',
    title: 'Calling from Above',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Calling from Above.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-east-nostalgia',
    title: 'East Nostalgia',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - East Nostalgia.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-ekitai-no-gainen',
    title: 'Ekitai No Gainen',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Ekitai No Gainen.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-exit-theme',
    title: 'Exit Theme',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Exit Theme.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-meditative-flow',
    title: 'Meditative Flow',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Meditative Flow.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-oboro-5-am',
    title: 'Oboro, 5 Am',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Oboro, 5 Am.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-omoide-yokocho',
    title: 'Omoide Yokocho',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Omoide Yokocho.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-reborn-from-ashes',
    title: 'Reborn from Ashes',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Reborn from Ashes.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-scarlet-feelings',
    title: 'Scarlet Feelings',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Scarlet Feelings.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-sinking-fatigue',
    title: 'Sinking Fatigue',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Sinking Fatigue.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-sprouting',
    title: 'Sprouting',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Sprouting.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-stream-of-thoughts',
    title: 'Stream of Thoughts',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Stream of Thoughts.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-towards-something-new',
    title: 'Towards Something New',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Towards Something New.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'raimu-vapor-trails',
    title: 'Vapor Trails',
    artist: 'Raimu',
    file: "/r2-audio/lofi/Raimu - Vapor Trails.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'roam-with-chief',
    title: 'Roam (with chief.)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Roam (with chief.).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'saudade-x-softy',
    title: 'Saudade x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Saudade x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'say-when-x-nowun',
    title: 'Say When x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Say When x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'seaside-farewell-x-softy',
    title: 'Seaside Farewell x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Seaside Farewell x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'silhouette',
    title: 'Silhouette',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Silhouette.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'silhouettes-x-nowun',
    title: 'Silhouettes x Nowun',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Silhouettes x Nowun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'sleminer-ft-nev-benjamin',
    title: 'Sleminer (ft Nev Benjamin)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Sleminer (ft Nev Benjamin).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'slow-down',
    title: 'Slow Down',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Slow Down.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'stardust-xander-purrple-cat',
    title: 'Stardust Xander Purrple Cat',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Stardust Xander Purrple Cat.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'summer-evenings-feat-dimension32',
    title: 'Summer Evenings (feat. Dimension32)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Summer Evenings (feat. Dimension32).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'sunrays-with-after-noon',
    title: 'Sunrays (with after noon)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Sunrays (with after noon).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'thoughts',
    title: 'Thoughts',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Thoughts.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'time-zones-ft-osaki',
    title: 'Time Zones ft Osaki',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Time Zones ft Osaki.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-eight-hazy-illuminations-with-gerardo-mill-n-master',
    title: 'Hazy Illuminations with Gerardo Millán (Master)',
    artist: 'Track Eight',
    file: "/r2-audio/lofi/Track Eight - Hazy Illuminations with Gerardo Millán (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-five-gentle-skies-with-softy-master',
    title: 'Gentle Skies with Softy (Master)',
    artist: 'Track Five',
    file: "/r2-audio/lofi/Track Five - Gentle Skies with Softy (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-four-beyond-the-boundary-with-purrple-cat-master',
    title: 'Beyond The Boundary with Purrple Cat (Master)',
    artist: 'Track Four',
    file: "/r2-audio/lofi/Track Four - Beyond The Boundary with Purrple Cat (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-one-rooftop-memories-master',
    title: 'Rooftop Memories (Master)',
    artist: 'Track One',
    file: "/r2-audio/lofi/Track One - Rooftop Memories (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-seven-lunar-tears-master',
    title: 'Lunar Tears (Master)',
    artist: 'Track Seven',
    file: "/r2-audio/lofi/Track Seven - Lunar Tears (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-six-after-the-rain-with-tibeauthetraveler-master',
    title: 'After The Rain with Tibeauthetraveler (Master)',
    artist: 'Track Six',
    file: "/r2-audio/lofi/Track Six - After The Rain with Tibeauthetraveler (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-three-reflections-master',
    title: 'Reflections (Master)',
    artist: 'Track Three',
    file: "/r2-audio/lofi/Track Three - Reflections (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'track-two-parallel-worlds-with-purrple-cat-master',
    title: 'Parallel Worlds with Purrple Cat (Master)',
    artist: 'Track Two',
    file: "/r2-audio/lofi/Track Two - Parallel Worlds with Purrple Cat (Master).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'traffic-lights',
    title: 'Traffic Lights',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Traffic Lights.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'treehouse-xander-w-philip-somber',
    title: 'Treehouse xander. w_ Philip Somber',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Treehouse xander. w_ Philip Somber.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'until-we-meet-again',
    title: 'Until We Meet Again',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Until We Meet Again.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-01-the-way-back',
    title: '01 - The Way Back',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 01 - The Way Back.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-02-silver-silver',
    title: '02 - Silver Silver',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 02 - Silver Silver.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-03-spanish-castle',
    title: '03 - Spanish Castle',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 03 - Spanish Castle.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-04-blazing-sun',
    title: '04 - Blazing Sun',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 04 - Blazing Sun.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-05-after-the-storm',
    title: '05 - After The Storm',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 05 - After The Storm.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-06-western-point',
    title: '06 - Western Point',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 06 - Western Point.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-07-wild-horses',
    title: '07 - Wild Horses',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 07 - Wild Horses.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-08-everything-we-left',
    title: '08 - Everything We Left',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 08 - Everything We Left.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-09-heartland',
    title: '09 - Heartland',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 09 - Heartland.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-10-diamond-dust',
    title: '10 - Diamond Dust',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 10 - Diamond Dust.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wys-x-sweet-medicine-11-harbour',
    title: '11 - Harbour',
    artist: 'WYS x Sweet Medicine',
    file: "/r2-audio/lofi/WYS x Sweet Medicine - 11 - Harbour.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'warm-waves-feat-hoogway',
    title: 'Warm Waves (feat. Hoogway)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Warm Waves (feat. Hoogway).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'we-always-are',
    title: 'We always are',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/We always are.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wishing-well-with-elk-beats',
    title: 'Wishing Well (with Elk Beats)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Wishing Well (with Elk Beats).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'wondering-ft-banks-and-purrple-cat',
    title: 'Wondering (ft Banks and Purrple Cat)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Wondering (ft Banks and Purrple Cat).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'words-on-water-x-softy',
    title: 'Words On Water x Softy',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Words On Water x Softy.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'yesterday-with-elk-beats',
    title: 'Yesterday (with Elk Beats)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Yesterday (with Elk Beats).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'your-touch',
    title: 'Your Touch',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/Your Touch.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'a-little-help',
    title: 'a little help',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/a little help.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'a-place-for-ghosts',
    title: 'a-place-for-ghosts',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/a-place-for-ghosts.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'and-then-i-woke-up-feat-no-one-s-perfect',
    title: 'and then i woke up (feat. no one\'s perfect)',
    artist: 'Various Artists',
    file: '/music/and then i woke up (feat. no one\'s perfect).mp3',
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'asphodel-w-tender-spring',
    title: 'asphodel w_ tender spring',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/asphodel w_ tender spring.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'autumn-warmth-ft-rook1e',
    title: 'autumn warmth ft. Rook1e',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/autumn warmth ft. Rook1e.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'beige-palette-mastered',
    title: 'beige palette (mastered)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/beige palette (mastered).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'bloom',
    title: 'bloom',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/bloom.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'blue-skies-xander-w-philip-somber',
    title: 'blue skies xander. w_ philip somber',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/blue skies xander. w_ philip somber.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'can-i',
    title: 'can-i',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/can-i.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'cold-coffee-w-tender-spring',
    title: 'cold coffee w tender spring',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/cold coffee w tender spring.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'cold-sting-in-the-wind',
    title: 'cold sting in the wind',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/cold sting in the wind .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'come-along',
    title: 'come-along',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/come-along.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'convo',
    title: 'convo',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/convo.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'dash-bounce',
    title: 'dash bounce',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/dash bounce.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'dimlight',
    title: 'dimlight',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/dimlight.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'drifting-into-the-sunset-ft-rook1e-mondo-loops',
    title: 'drifting into the sunset ft. Rook1e _ Mondo Loops',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/drifting into the sunset ft. Rook1e _ Mondo Loops.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'everything-goes-past',
    title: 'everything goes past',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/everything goes past.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'false-promise',
    title: 'false-promise',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/false-promise.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'float-w-bojo',
    title: 'float w bojo',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/float w bojo.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'fruit-loom',
    title: 'fruit loom',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/fruit loom.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'ghosts-feat-no-one-s-perfect',
    title: 'ghosts (feat. no one\'s perfect)',
    artist: 'Various Artists',
    file: '/music/ghosts (feat. no one\'s perfect).mp3',
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'gold-coast',
    title: 'gold coast',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/gold coast.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'good-friends-w-towerz',
    title: 'good friends w_ towerz',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/good friends w_ towerz.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'goodnight',
    title: 'goodnight',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/goodnight.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hazelnut',
    title: 'hazelnut',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/hazelnut.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'holding-hams-w-tatami-construct-1',
    title: 'holding hams w tatami construct (1)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/holding hams w tatami construct (1).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'homecoming-feat-bert',
    title: 'homecoming (feat. Bert)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/homecoming (feat. Bert).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'hourglass-w-brillion',
    title: 'hourglass w_ brillion',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/hourglass w_ brillion.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'i-got-u-w-asw-blue-wednesday',
    title: 'i got u w. asw & blue wednesday',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/i got u w. asw & blue wednesday.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'im-with-you',
    title: 'im with you',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/im with you.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'in-silence-ft-loutlander',
    title: 'in-silence-ft-loutlander',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/in-silence-ft-loutlander.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-new-beginnings-home-mastered',
    title: 'new beginnings - home - Mastered',
    artist: 'jhove',
    file: "/r2-audio/lofi/jhove - new beginnings - home - Mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-new-beginnings-i-saw-birds-flying-mastered',
    title: 'new beginnings - i saw birds flying - mastered',
    artist: 'jhove',
    file: "/r2-audio/lofi/jhove - new beginnings - i saw birds flying - mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-x-cxlt-new-beginnings-hold-my-hand-mastered',
    title: 'new beginnings - hold my hand - mastered',
    artist: 'jhove x cxlt',
    file: "/r2-audio/lofi/jhove x cxlt - new beginnings - hold my hand - mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-x-kokoro-new-beginnings-i-hoope-this-never-ends-master',
    title: 'new beginnings - i hoope this never ends - mastered',
    artist: 'jhove x kokoro',
    file: "/r2-audio/lofi/jhove x kokoro - new beginnings - i hoope this never ends - mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-x-towerz-new-beginnings-big-city-mastered',
    title: 'new beginnings - big city - mastered',
    artist: 'jhove x towerz',
    file: "/r2-audio/lofi/jhove x towerz - new beginnings - big city - mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-x-towerz-new-beginnings-the-stars-outside-my-window-ma',
    title: 'new beginnings - the stars outside my window - mastered',
    artist: 'jhove x towerz',
    file: "/r2-audio/lofi/jhove x towerz - new beginnings - the stars outside my window - mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-x-wys-new-beginnings-its-been-a-long-day-mastered',
    title: 'new beginnings - its been a long day - mastered',
    artist: 'jhove x wys',
    file: "/r2-audio/lofi/jhove x wys - new beginnings - its been a long day - mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'jhove-x-wys-new-beginnings-where-have-you-been-all-day-maste',
    title: 'new beginnings - where have you been all day - mastered',
    artist: 'jhove x wys',
    file: "/r2-audio/lofi/jhove x wys - new beginnings - where have you been all day - mastered.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'kermode',
    title: 'kermode',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/kermode.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'kompen',
    title: 'kompen',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/kompen.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'last-sunset-w-towerz-edelwize',
    title: 'last sunset w towerz & edelwize',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/last sunset w towerz & edelwize.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'leap-of-faith',
    title: 'leap of faith',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/leap of faith.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'lightwave-ft-wishes-and-dreams',
    title: 'lightwave-ft-wishes-and-dreams',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/lightwave-ft-wishes-and-dreams.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'love-doesnt-live-here-w-carrick',
    title: 'love doesnt live here w carrick',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/love doesnt live here w carrick.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'michigan-avenue',
    title: 'michigan avenue',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/michigan avenue.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'mojave-backyard',
    title: 'mojave backyard',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/mojave backyard.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'moonlit-glass-ft-mondo-loops',
    title: 'moonlit-glass-ft-mondo-loops',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/moonlit-glass-ft-mondo-loops.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'morning-moon-ft-wishes-and-dreams',
    title: 'morning-moon-ft-wishes-and-dreams',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/morning-moon-ft-wishes-and-dreams.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'mr-espresso',
    title: 'mr espresso',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/mr espresso.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'nk-surf-2021',
    title: 'nk surf 2021',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/nk surf 2021.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'no-wind-at-the-dock-instrumental',
    title: 'no wind at the dock instrumental',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/no wind at the dock instrumental.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'no-worries-mastered',
    title: 'no worries (mastered)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/no worries (mastered).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'notion',
    title: 'notion',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/notion.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'ontario',
    title: 'ontario',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/ontario.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'park-bells',
    title: 'park bells',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/park bells.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'plucky-w-blurred-figures',
    title: 'plucky w blurred figures',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/plucky w blurred figures.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'prinsessealleen-with-aid-master-bump',
    title: 'prinsessealleen with aid master bump',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/prinsessealleen with aid master bump.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'puffy-tail',
    title: 'puffy tail',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/puffy tail.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'ready-when-you-are-ft-fourwalls',
    title: 'ready when you are (ft. fourwalls)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/ready when you are (ft. fourwalls).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'river-walk',
    title: 'river walk',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/river walk.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'sandalwood-w-khutko',
    title: 'sandalwood w_ khutko',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/sandalwood w_ khutko.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'six-ten',
    title: 'six ten',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/six ten.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'slow-melt-w-asw-inky',
    title: 'slow melt w asw & INKY!',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/slow melt w asw & INKY!.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'snowfall',
    title: 'snowfall',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/snowfall.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'snowstorm-in-april-w-chief-biniou',
    title: 'snowstorm in april w. chief & biniou',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/snowstorm in april w. chief & biniou.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'springtime-with-friends-w-biniou',
    title: 'springtime, with friends w. biniou',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/springtime, with friends w. biniou.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'take-it-easy-mastered',
    title: 'take it easy (mastered)',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/take it easy (mastered).mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'take-me-back-ft-nymano',
    title: 'take-me-back-ft-nymano',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/take-me-back-ft-nymano.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'tetris',
    title: 'tetris',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/tetris .mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'thoughtful-w-philip-somber',
    title: 'thoughtful w Philip Somber',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/thoughtful w Philip Somber.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'time-s-up-ft-natasha-ghosh',
    title: 'time-s-up-ft-natasha-ghosh',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/time-s-up-ft-natasha-ghosh.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'together-again-w-goosetaf',
    title: 'together again w goosetaf',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/together again w goosetaf.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'tulip-bounce',
    title: 'tulip bounce',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/tulip bounce.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'we-ll-be-waiting-a-while-ft-rook1e-tender-spring',
    title: 'we_ll be waiting a while ft. Rook1e _ tender spring',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/we_ll be waiting a while ft. Rook1e _ tender spring.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'whisperer-ft-wishes-and-dreams',
    title: 'whisperer-ft-wishes-and-dreams',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/whisperer-ft-wishes-and-dreams.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'white-dragon-ft-wishes-and-dreams',
    title: 'white-dragon-ft-wishes-and-dreams',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/white-dragon-ft-wishes-and-dreams.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  },
  {
    id: 'willow-hill',
    title: 'willow hill',
    artist: 'Various Artists',
    file: "/r2-audio/lofi/willow hill.mp3",
    credits: 'Lofi / Chill Beats',
    genre: 'lofi'
  }
];

// Generated 799 tracks!

// Make library globally accessible for credits display
window.MUSIC_LIBRARY = MUSIC_LIBRARY;

class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.autoplay = false; // Disable autoplay for Discord compatibility
    this.audio.preload = 'metadata'; // Only preload metadata, not full audio
    this.currentTrack = null;
    this.currentTrackIndex = -1;
    this.isPlaying = false;
    this.playlist = [];
    this.settings = null;
    this.autoplayPending = false;
    this.userInteractionHandler = null;
    this.previousVolume = 0.7; // Store previous volume for mute/unmute
    this.currentGenre = 'lofi'; // Default genre
    this.availableGenres = ['lofi', 'synthwave']; // Available music genres

    // Bind methods
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
  }

  init() {
    this.setupAudioEvents();
    this.shufflePlaylist(); // Shuffle on init so order is random each time
    this.renderPlayer();
    this.loadSettings();
    this.setupEventListeners();

    // Auto-load the first track from shuffled playlist
    if (this.playlist.length > 0) {
      const firstTrackId = this.playlist[0].id;
      this.loadTrack(firstTrackId);
      // Try to start playback immediately so music begins on page load
      this.play(true);
    }
  }

  // Shuffle the playlist using Fisher-Yates algorithm
  shufflePlaylist(genre = null) {
    // Use provided genre or current genre
    const filterGenre = genre || this.currentGenre;

    // Filter library by genre
    const filteredLibrary = MUSIC_LIBRARY.filter(track => track.genre === filterGenre);

    // Create a copy of the filtered library
    this.playlist = [...filteredLibrary];

    // Fisher-Yates shuffle
    for (let i = this.playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
    }

    // Shuffled playlist
  }

  // Reshuffle the playlist and restart from first track
  reshufflePlaylist() {
    const wasPlaying = this.isPlaying;

    // Pause current track
    if (wasPlaying) {
      this.pause();
    }

    // Reshuffle
    this.shufflePlaylist();

    // Load first track from new shuffle
    if (this.playlist.length > 0) {
      this.loadTrack(this.playlist[0].id);

      // Resume playing if it was playing before
      if (wasPlaying) {
        this.play();
      }
    }

    // Playlist reshuffled
  }

  // Select a music genre and reshuffle playlist
  selectGenre(genre) {
    if (!this.availableGenres.includes(genre)) {
      console.error(`Invalid genre: ${genre}`);
      return;
    }

    const wasPlaying = this.isPlaying;

    // Pause current track
    if (wasPlaying) {
      this.pause();
    }

    // Update current genre
    this.currentGenre = genre;

    // Save genre preference to localStorage
    localStorage.setItem('musicGenre', genre);

    // Reshuffle playlist with new genre
    this.shufflePlaylist(genre);

    // Load first track from new genre
    if (this.playlist.length > 0) {
      this.loadTrack(this.playlist[0].id);

      // Resume playing if it was playing before
      if (wasPlaying) {
        this.play();
      }
    }

    // Update genre badge in UI
    this.updateGenreBadge();

    // Dispatch genre changed event for settings panel
    window.dispatchEvent(new CustomEvent('genreChanged', { detail: { genre } }));
  }

  // Update the genre badge in the player UI
  updateGenreBadge() {
    const badge = document.querySelector('.genre-badge');
    if (badge) {
      // Capitalize first letter
      const genreText = this.currentGenre.charAt(0).toUpperCase() + this.currentGenre.slice(1);
      badge.textContent = genreText;
      badge.setAttribute('data-genre', this.currentGenre);
    }

    // Also update the genre button text in more options menu
    const genreBtn = document.getElementById('genre-btn-menu');
    if (genreBtn) {
      const genreText = this.currentGenre.charAt(0).toUpperCase() + this.currentGenre.slice(1);
      // Keep the SVG and update only the text
      const svg = genreBtn.querySelector('svg');
      genreBtn.textContent = `Genre: ${genreText}`;
      if (svg) {
        genreBtn.insertBefore(svg, genreBtn.firstChild);
      }
    }
  }

  setupAudioEvents() {
    this.audio.addEventListener('play', this.handlePlay);
    this.audio.addEventListener('pause', this.handlePause);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('ended', this.handleEnded);
    this.audio.addEventListener('error', this.handleError);
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
  }

  loadSettings() {
    this.settings = window.getPomodoroSettings ? window.getPomodoroSettings() : {};

    // Set volume from settings (use musicVolume if available, fallback to volume)
    const volume = this.settings.musicVolume !== undefined ? this.settings.musicVolume : (this.settings.volume || 70);
    this.audio.volume = volume / 100;

    // Load genre preference from localStorage
    const savedGenre = localStorage.getItem('musicGenre');
    if (savedGenre && this.availableGenres.includes(savedGenre)) {
      this.currentGenre = savedGenre;
      // Re-shuffle with saved genre
      this.shufflePlaylist(this.currentGenre);
      // Update badge if it exists
      this.updateGenreBadge();
    }

    // Listen for settings changes
    window.addEventListener('settingsChanged', (event) => {
      this.settings = event.detail;

      // Update volume if changed
      const newVolume = this.settings.musicVolume !== undefined ? this.settings.musicVolume : (this.settings.volume || 70);
      this.audio.volume = newVolume / 100;
      this.updateVolumeUI();
    });
  }

  renderPlayer() {
    const container = document.getElementById('music-player-container');
    if (!container) return;

    if (this.playlist.length === 0) {
      // Keep the no-music message simple
      container.innerHTML = `<p class="no-music-message">No music available.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="progress-bar-container" id="progress-bar">
        <div class="progress-fill" id="progress-fill"></div>
      </div>
      <div class="player-content">
        <div class="track-info">
          <div class="genre-selector-container">
            <div class="genre-badge" data-genre="${this.currentGenre}" title="Click to change genre">${this.currentGenre.charAt(0).toUpperCase() + this.currentGenre.slice(1)}</div>
            <div class="genre-selector-menu">
              <button class="genre-option" data-genre="lofi">
                <span>Lofi / Chill Beats</span>
              </button>
              <button class="genre-option" data-genre="synthwave">
                <span>Synthwave / 80's</span>
              </button>
            </div>
          </div>
          <div class="track-details">
            <h3 id="track-title">No Track Selected</h3>
            <p id="track-artist">-</p>
          </div>
        </div>

        <div class="player-controls">
          <button class="control-btn" id="prev-btn" title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button class="control-btn play-pause" id="play-pause-btn" title="Play">
            <svg id="play-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M8 5v14l11-7z"/></svg>
            <svg id="pause-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" style="display: none;"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          </button>
          <button class="control-btn" id="next-btn" title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M16 18h2V6h-2zm-11-1l8.5-6L5 5z"/></svg>
          </button>
        </div>

        <div class="player-actions">
           <button class="control-btn" id="background-btn" title="Change Background">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </button>
          <div class="background-selector-menu">
            <div class="background-option" data-background="road-video">
              <video src="/r2-backgrounds/road.mp4" muted loop playsinline style="width: 100%; height: 60px; object-fit: cover; pointer-events: none;"></video>
              <span>Road</span>
            </div>
            <div class="background-option" data-background="room-video">
              <video src="/r2-backgrounds/room.mp4" muted loop playsinline style="width: 100%; height: 60px; object-fit: cover; pointer-events: none;"></video>
              <span>Room</span>
            </div>
            <div class="background-option" data-background="eyes-video">
              <video src="/r2-backgrounds/eyes-wallpaper.mp4" muted loop playsinline style="width: 100%; height: 60px; object-fit: cover; pointer-events: none;"></video>
              <span>Eyes</span>
            </div>
          </div>
          <div class="volume-control">
            <button class="control-btn" id="volume-btn" title="Volume">
              <div class="volume-icon" id="volume-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M15.54 8.46a5 5 0 010 7.07"></path>
                </svg>
              </div>
            </button>
            <div class="volume-slider-container">
              <input type="range" class="volume-slider" id="music-volume-slider" min="0" max="100" value="70">
            </div>
          </div>
          <button class="control-btn" id="more-options-btn" title="More options">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </button>
          <div class="more-options-menu">
            <button id="shuffle-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>Shuffle</button>
            <button id="genre-btn-menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/></svg>Genre: ${this.currentGenre.charAt(0).toUpperCase() + this.currentGenre.slice(1)}</button>
            <button id="settings-btn-menu"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>Settings</button>
            <button id="music-credits-btn-menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7C10.07 9.5 8.5 10.92 8.5 12.75h1.5c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h1.5c0-2.25 3-2.5 3-5 .01-1.93-1.56-3.5-3.5-3.5z"/></svg>Credits</button>
          </div>
          <div class="genre-selector-menu">
            <button class="genre-option" data-genre="lofi">Lofi / Chill Beats</button>
            <button class="genre-option" data-genre="synthwave">Synthwave / 80's</button>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Play/Pause button
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    }

    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousTrack());
    }

    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextTrack());
    }

    // Shuffle button in menu
    const shuffleBtnMenu = document.getElementById('shuffle-btn');
    if (shuffleBtnMenu) {
      shuffleBtnMenu.addEventListener('click', () => {
        this.reshufflePlaylist();
        this.closeMoreOptionsMenu();
      });
    }

    // Music credits button in menu
    const creditsBtnMenu = document.getElementById('music-credits-btn-menu');
    if (creditsBtnMenu) {
      creditsBtnMenu.addEventListener('click', () => {
        // This assumes a global function to open the credits modal/tab
        if (window.openMusicCredits) {
          window.openMusicCredits();
        }
        this.closeMoreOptionsMenu();
      });
    }

    // Settings button in menu
    const settingsBtnMenu = document.getElementById('settings-btn-menu');
    if (settingsBtnMenu) {
      settingsBtnMenu.addEventListener('click', () => {
        // This assumes a global function to open the settings modal
        if (window.openSettingsModal) {
          window.openSettingsModal();
        }
        this.closeMoreOptionsMenu();
      });
    }

    // Genre button in menu - toggles genre selector
    const genreBtnMenu = document.getElementById('genre-btn-menu');
    if (genreBtnMenu) {
      genreBtnMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleGenreSelector();
        this.closeMoreOptionsMenu();
      });
    }

    // Genre badge - toggles genre selector
    const genreBadge = document.querySelector('.genre-badge');
    if (genreBadge) {
      genreBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleGenreSelector();
      });
    }

    // Genre selector options
    const genreOptions = document.querySelectorAll('.genre-option');
    genreOptions.forEach(option => {
      option.addEventListener('click', () => {
        const genre = option.dataset.genre;
        this.selectGenre(genre);
        this.closeGenreSelector();
      });
    });

    // More options button
    const moreOptionsBtn = document.getElementById('more-options-btn');
    if (moreOptionsBtn) {
      moreOptionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMoreOptionsMenu();
      });
    }

    // Background selector button
    const backgroundBtn = document.getElementById('background-btn');
    if (backgroundBtn) {
      backgroundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleBackgroundSelector();
      });
    }

    // Background options
    const backgroundOptions = document.querySelectorAll('.background-selector-menu .background-option');
    backgroundOptions.forEach(option => {
      option.addEventListener('click', () => {
        const bg = option.getAttribute('data-background');
        this.selectBackground(bg);
      });

      // Play video preview on hover
      const video = option.querySelector('video');
      if (video) {
        // Try to load and show video preview
        video.load();

        // Add error handling for failed video loads
        video.addEventListener('error', () => {
          const fallback = document.createElement('div');
          fallback.className = 'gradient-preview';
          fallback.style.cssText = `
            width: 100%;
            height: 60px;
            background: linear-gradient(135deg,
              rgba(236, 72, 153, 0.3),
              rgba(251, 146, 60, 0.3));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            opacity: 0.7;
          `;
          fallback.textContent = '🎬';
          video.replaceWith(fallback);
        });

        option.addEventListener('mouseenter', () => {
          video.play().catch(e => console.log('Video play prevented:', e));
        });
        option.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });

    // Volume button - now just for muting/unmuting
    const volumeBtn = document.getElementById('volume-btn');
    if (volumeBtn) {
      volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Toggle mute
        if (this.audio.volume > 0) {
          this.previousVolume = this.audio.volume;
          this.setVolume(0);
        } else {
          this.setVolume((this.previousVolume || 0.7) * 100);
        }
      });
    }

    // Volume slider
    const volumeSlider = document.getElementById('music-volume-slider');
    if (volumeSlider) {
      // Set initial CSS variable for gradient
      volumeSlider.style.setProperty('--volume-percent', volumeSlider.value + '%');
      
      // Update volume in real-time while dragging
      volumeSlider.addEventListener('input', (e) => {
        const newVolume = parseInt(e.target.value, 10);
        window.dispatchEvent(new CustomEvent('musicVolumeChanged', { detail: { volume: newVolume } }));
      });

    window.addEventListener('musicVolumeChanged', (event) => {
      const newVolume = event.detail.volume;
      this.audio.volume = newVolume / 100;
      this.updateVolumeUI();
    });
    }

    // Progress bar seeking
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.addEventListener('click', (e) => this.seek(e));
    }

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.more-options-menu') && !e.target.closest('#more-options-btn')) {
        this.closeMoreOptionsMenu();
      }
      if (!e.target.closest('.background-selector-menu') && !e.target.closest('#background-btn')) {
        this.closeBackgroundSelector();
      }
      if (!e.target.closest('.genre-selector-menu') && !e.target.closest('.genre-badge') && !e.target.closest('#genre-btn-menu')) {
        this.closeGenreSelector();
      }
    });
  }

  loadTrack(trackId) {
    if (!trackId) {
      console.error('No track ID provided');
      return;
    }

    const track = this.playlist.find(t => t.id === trackId);
    if (!track) {
      console.error('Track not found:', trackId);
      return;
    }

    this.currentTrack = track;
    this.currentTrackIndex = this.playlist.indexOf(track);

    // Set crossOrigin before setting src for CORS
    this.audio.crossOrigin = 'anonymous';
    this.audio.src = track.file.startsWith('/r2-audio/')
      ? `${R2_MUSIC_BASE_URL}${track.file.replace('/r2-audio', '')}`
      : track.file;

    // Track loaded
    
    this.updateTrackInfo(track.title, track.artist);

    // Auto-play if user was already playing music
    if (this.isPlaying) {
      this.play();
    }
  }

  togglePlayPause() {
    if (!this.currentTrack) {
      // If no track selected, load the first one from shuffled playlist
      if (this.playlist.length > 0) {
        this.loadTrack(this.playlist[0].id);
        this.play();
      }
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async play(isAutoplay = false) {
    if (!this.currentTrack) return;

    // For Discord/iframe contexts, try to load first if needed
    if (this.audio.readyState < 2 && !isAutoplay) {
      try {
        this.audio.load();
        // Small delay to let it start loading
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (loadErr) {
        console.error('[Music Player] Load error:', loadErr);
      }
    }

    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updatePlayPauseButton(true);

      // Resume ambient sounds
      if (window.ambientSoundsManager) {
        window.ambientSoundsManager.resumeAll();
      }

      // Force clear error messages
      setTimeout(() => {
        this.clearErrorMessage();
      }, 100);
    }).catch(err => {
      this.isPlaying = false;
      this.updatePlayPauseButton(false);

      const hasMessage = err && typeof err.message === 'string';
      const message = hasMessage ? err.message.toLowerCase() : '';
      const errorName = err?.name || '';
      const autoplayBlocked = errorName === 'NotAllowedError' || errorName === 'NotSupportedError' || (message.includes('user') && message.includes('interaction')) || message.includes('not allowed');

      if (autoplayBlocked) {
        // Don't show error message for autoplay blocking - it's expected behavior
        return;
      }

      // If we have an audio.error, it's a media loading error
      if (this.audio.error) {
        const errorMessages = {
          1: 'MEDIA_ERR_ABORTED: Loading aborted',
          2: 'MEDIA_ERR_NETWORK: Network error - check URL/rewrites',
          3: 'MEDIA_ERR_DECODE: Decode error - file corrupted',
          4: 'MEDIA_ERR_SRC_NOT_SUPPORTED: Source not supported - check Discord URL mapping'
        };
        const mediaErrorMsg = errorMessages[this.audio.error.code] || `Unknown media error: ${this.audio.error.code}`;
        console.error('[Music Player] Media error:', mediaErrorMsg);
        this.showError(`❌ ${mediaErrorMsg}`, 0);
      } else {
        console.error('[Music Player] Playback failed:', errorName, message);
        this.showError('❌ Failed to play audio. Try again.', 0);
      }
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayPauseButton(false);

    // Pause ambient sounds
    if (window.ambientSoundsManager) {
      window.ambientSoundsManager.pauseAll();
    }
  }

  previousTrack() {
    if (this.playlist.length === 0) return;

    this.currentTrackIndex--;
    if (this.currentTrackIndex < 0) {
      this.currentTrackIndex = this.playlist.length - 1;
    }

    this.loadTrack(this.playlist[this.currentTrackIndex].id);
    if (this.isPlaying) {
      this.play();
    }
  }

  nextTrack() {
    if (this.playlist.length === 0) return;

    this.currentTrackIndex++;
    if (this.currentTrackIndex >= this.playlist.length) {
      this.currentTrackIndex = 0;
    }

    this.loadTrack(this.playlist[this.currentTrackIndex].id);
    if (this.isPlaying) {
      this.play();
    }
  }

  seek(event) {
    if (!this.currentTrack || !this.audio.duration) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    this.audio.currentTime = pos * this.audio.duration;
  }

  setVolume(value) {
    const volume = value / 100;
    this.audio.volume = volume;
    
    // Store previous volume if not muting
    if (volume > 0) {
      this.previousVolume = volume;
    }
    
    this.updateVolumeIcon(volume);
    this.saveVolumeToSettings(value);
  }



  // Event Handlers
  handlePlay() {
    this.isPlaying = true;
    this.updatePlayPauseButton(true);
    this.clearErrorMessage();
  }

  handlePause() {
    this.isPlaying = false;
    this.updatePlayPauseButton(false);
  }

  handleTimeUpdate() {
    if (!this.audio.duration) return;

    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    this.updateProgress(progress);
    this.updateCurrentTime(this.audio.currentTime);
  }

  handleEnded() {
    // Auto-play next track
    // Set isPlaying to true before calling nextTrack so the next song auto-plays
    this.isPlaying = true;
    this.nextTrack();
  }

  handleError(e) {
    const audioError = this.audio.error;
    let errorMessage = 'Error loading audio file';
    let errorCode = 'UNKNOWN';

    if (audioError) {
      // Provide specific error messages based on error code
      switch (audioError.code) {
        case 1: // MEDIA_ERR_ABORTED
          errorCode = 'MEDIA_ERR_ABORTED';
          errorMessage = '⚠️ Audio loading was aborted. Please try again.';
          break;
        case 2: // MEDIA_ERR_NETWORK
          errorCode = 'MEDIA_ERR_NETWORK';
          errorMessage = '⚠️ Network error loading audio. Check connection.';
          break;
        case 3: // MEDIA_ERR_DECODE
          errorCode = 'MEDIA_ERR_DECODE';
          errorMessage = '⚠️ Audio file is corrupted or unsupported format.';
          break;
        case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
          errorCode = 'MEDIA_ERR_SRC_NOT_SUPPORTED';
          errorMessage = '⚠️ Audio source not supported by browser/Discord.';
          break;
        default:
          errorMessage = `⚠️ Audio error (code ${audioError.code})`;
      }
    }

    // Check environment
    const inIframe = window.self !== window.top;
    const isDiscord = inIframe || new URLSearchParams(window.location.search).has('frame_id');

    if (isDiscord) {
      errorMessage += ' [Discord Activity]';
    }

    console.error('[Music Player] Audio error:', errorCode, '-', this.currentTrack?.title || 'Unknown');

    this.showError(errorMessage, 0); // Don't auto-hide error messages
    this.isPlaying = false;
    this.updatePlayPauseButton(false);
  }

  handleLoadedMetadata() {
    this.updateDuration(this.audio.duration);
  }

  // UI Updates
  updateTrackInfo(title, artist) {
    const titleEl = document.getElementById('track-title');
    const artistEl = document.getElementById('track-artist');
    if (titleEl) titleEl.textContent = title;
    if (artistEl) artistEl.textContent = artist;
  }

  updatePlayPauseButton(isPlaying) {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const btn = document.getElementById('play-pause-btn');

    if (playIcon && pauseIcon) {
      playIcon.style.display = isPlaying ? 'none' : 'block';
      pauseIcon.style.display = isPlaying ? 'block' : 'none';
    }

    if (btn) {
      btn.title = isPlaying ? 'Pause' : 'Play';
    }
  }

  updateProgress(percent) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      progressFill.style.width = percent + '%';
    }
  }

  updateCurrentTime(seconds) {
    const currentTimeEl = document.getElementById('current-time');
    if (currentTimeEl) {
      currentTimeEl.textContent = this.formatTime(seconds);
    }
  }

  updateDuration(seconds) {
    const durationEl = document.getElementById('duration-time');
    if (durationEl) {
      durationEl.textContent = this.formatTime(seconds);
    }
  }

  updateVolumeUI() {
    const volumeSlider = document.getElementById('music-volume-slider');
    if (volumeSlider) {
      volumeSlider.value = this.audio.volume * 100;
      // Update CSS variable for gradient
      volumeSlider.style.setProperty('--volume-percent', (this.audio.volume * 100) + '%');
    }
    this.updateVolumeIcon(this.audio.volume);
  }

  updateVolumeIcon(volume) {
    const volumeIcon = document.getElementById('volume-icon');
    if (!volumeIcon) return;

    let iconSVG;
    if (volume === 0) {
      iconSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    } else if (volume < 0.5) {
      iconSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <path d="M15.54 8.46a5 5 0 010 7.07"></path>
        </svg>
      `;
    } else {
      iconSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <path d="M15.54 8.46a5 5 0 010 7.07"></path>
          <path d="M19.07 4.93a10 10 0 010 14.14"></path>
        </svg>
      `;
    }
    volumeIcon.innerHTML = iconSVG;
  }

  showError(message, duration = 5000) {
    const container = document.getElementById('music-player-container');
    if (!container) return;

    let errorEl = container.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      
      // Add special class for autoplay messages
      if (message.toLowerCase().includes('autoplay')) {
        errorEl.classList.add('autoplay-message');
      }
      
      container.appendChild(errorEl);
    }

    errorEl.textContent = message;

    if (duration !== 0) {
      setTimeout(() => {
        if (errorEl && errorEl.parentNode) {
          errorEl.remove();
        }
      }, duration);
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Menu and Volume Slider Management
  toggleMoreOptionsMenu() {
    const menu = document.querySelector('.more-options-menu');
    if (menu) menu.classList.toggle('active');
  }

  closeMoreOptionsMenu() {
    const menu = document.querySelector('.more-options-menu');
    if (menu) menu.classList.remove('active');
  }

  toggleBackgroundSelector() {
    const menu = document.querySelector('.background-selector-menu');
    if (menu) {
      menu.classList.toggle('active');
      // Update selected state when opening
      if (menu.classList.contains('active')) {
        this.updateBackgroundSelection();
      }
    }
  }

  closeBackgroundSelector() {
    const menu = document.querySelector('.background-selector-menu');
    if (menu) menu.classList.remove('active');
  }

  toggleGenreSelector() {
    const menu = document.querySelector('.genre-selector-menu');
    if (menu) menu.classList.toggle('active');
  }

  closeGenreSelector() {
    const menu = document.querySelector('.genre-selector-menu');
    if (menu) menu.classList.remove('active');
  }

  selectBackground(backgroundName) {
    // Update UI to show selected background
    this.updateBackgroundSelection(backgroundName);
    
    // Apply the background immediately
    this.applyBackground(backgroundName);
    
    // Save to settings
    this.saveBackgroundToSettings(backgroundName);
    
    // Close the menu
    this.closeBackgroundSelector();
  }

  updateBackgroundSelection(selectedBg) {
    // Get current background from settings or use the provided one
    const currentBg = selectedBg || this.getCurrentBackground();
    
    // Update selected state for all background options in the music player menu
    const backgroundOptions = document.querySelectorAll('.background-selector-menu .background-option');
    backgroundOptions.forEach(option => {
      if (option.dataset.background === currentBg) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  }

  getCurrentBackground() {
    // Get from localStorage settings
    try {
      const settings = JSON.parse(localStorage.getItem('pomodoroSettings'));
      return settings?.background || 'wood';
    } catch (e) {
      return 'wood';
    }
  }

  applyBackground(backgroundName) {
    const backgroundMap = {
      'dark-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)' },
      'purple-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #581c87 0%, #3b0764 100%)' },
      'forest-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' },
      'sunset-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #92400e 0%, #451a03 100%)' },
      'road-video': { type: 'video', value: '/r2-backgrounds/road.mp4' },
      'room-video': { type: 'video', value: '/r2-backgrounds/room.mp4' },
      'eyes-video': { type: 'video', value: '/r2-backgrounds/eyes-wallpaper.mp4' }
    };

    const bg = backgroundMap[backgroundName] || backgroundMap['room-video'];

    // Remove any existing video background
    const existingVideo = document.getElementById('background-video');
    if (existingVideo) {
      existingVideo.remove();
    }

    if (bg.type === 'video') {
      // Create video background element
      const video = document.createElement('video');
      video.id = 'background-video';
      video.src = bg.value;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.position = 'fixed';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      video.style.zIndex = '-1';
      video.style.pointerEvents = 'none';
      
      // Add overlay
      const overlay = document.createElement('div');
      overlay.id = 'video-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(0, 0, 0, 0.5)';
      overlay.style.zIndex = '-1';
      overlay.style.pointerEvents = 'none';
      
      document.body.prepend(overlay);
      document.body.prepend(video);
      
      // Clear background image
      document.body.style.backgroundImage = 'none';
      
      // Play video
      video.play().catch(e => console.log('Video autoplay prevented:', e));
    } else {
      // Remove video overlay if it exists
      const overlay = document.getElementById('video-overlay');
      if (overlay) {
        overlay.remove();
      }
      
      if (bg.type === 'image') {
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${bg.value}")`;
      } else if (bg.type === 'gradient') {
        document.body.style.backgroundImage = bg.value;
      }
      
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  }

  saveBackgroundToSettings(backgroundName) {
    try {
      const settings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {};
      settings.background = backgroundName;
      localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save background:', e);
    }
  }

  toggleVolumeSlider() {
    const sliderContainer = document.querySelector('.volume-slider-container');
    if (sliderContainer) sliderContainer.classList.toggle('active');
  }

  closeVolumeSlider() {
    const sliderContainer = document.querySelector('.volume-slider-container');
    if (sliderContainer) sliderContainer.classList.remove('active');
  }

  scheduleAutoplayOnInteraction() {
    if (this.autoplayPending) return;

    this.autoplayPending = true;
    const handler = () => {
      document.removeEventListener('pointerdown', handler);
      document.removeEventListener('keydown', handler);
      this.autoplayPending = false;
      this.userInteractionHandler = null;
      if (!this.isPlaying) {
        this.play();
      }
    };

    this.userInteractionHandler = handler;
    document.addEventListener('pointerdown', handler, { once: true });
    document.addEventListener('keydown', handler, { once: true });

    this.showError('Autoplay was blocked. Click anywhere or press a key to start the music.', 0);
  }

  clearErrorMessage() {
    const container = document.getElementById('music-player-container');
    if (!container) return;

    const errorEl = container.querySelector('.error-message');
    if (errorEl && errorEl.parentNode) {
      errorEl.remove();
    }
  }
}

// Initialize music player when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const player = new MusicPlayer();
  player.init();

  // Make player globally accessible for debugging
  window.musicPlayer = player;
});
