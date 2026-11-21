import type { MediaAsset } from '@/components/types'

export const U = (id: string, width = 1600): string =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=78&auto=format&fit=crop`

export const V = (id: string): string =>
  `https://videos.pexels.com/video-files/${id}.mp4`

export const IMG = {
  desert: '1489493585363-d69421e0edd3',
  dunes: '1506645728556-ac574e628eca',
  camels: '1549944850-84e00be4203b',
  camelsBeach: '1528702748617-c64d49f918af',
  dubai: '1512453979798-5ea266f8880c',
  dubaiNight: '1510665724063-f77a01074aa2',
  burjArab: '1518684079-3c830dcef090',
  frame: '1628859017536-c2f1d69f3c84',
  creek: '1582120042072-d01e2fc8f3ea',
  souk: '1636924271402-d639875aa2bb',
  coffee: '1774529233247-d3f34ed11994',
  mosque: '1512632578888-169bbbc64f33',
  mosque2: '1590273089302-ebbc53986b6e',
  saadiyat: '1587421890935-5fb13a3beccc',
  alain: '1593714215724-dc9fb548df7e',
  sharjah: '1778067217860-971b430b84c6',
  sharjahCoast: '1566555108172-f8a02274a3d3',
  jais: '1542878447-e2b6df2526fa',
  fujairah: '1648814037760-1dd4d3169a26',
  hatta: '1616879151261-c814c3d07215',
  uaq: '1664900314549-877760f81e78',
  conference: '1540575467063-178a50c2df87',
  gala: '1768508951405-10e83c4a2872',
  handshake: '1521791136064-7986c2920216',
  chauffeur: '1533630217389-3a5e4dff5683',
  passport: '1553697388-94e804e2f0f6',
  airport: '1532968899863-5b52ef155913',
  hotel: '1611892440504-42a792e24d32',
  map: '1516546453174-5e1098a4b4af',
  cruise: '1599640842225-85d111c60e6b',
  tbilisi: '1565008576549-57569a49371d',
  baku: '1596306499300-0b7b1689b9f6',
  istanbul: '1524231757912-21f4fe3a7200',
  maldives: '1573843981267-be1999ff37cd',
  swiss: '1527668752968-14dc70a27c95',
  thailand: '1519451241324-20b4ea2c4220',
  aquarium: '1512391806023-e43a4e65899f',
  ferrari: '1578152882785-df9744e359e5',
  garden: '1588314941393-af1c493f345c',
  skydive: '1640968272493-8bc83db2cf41',
  balloon: '1750008415039-65c10dcbb4a5',
  buggy: '1517962140171-2dfc01caecb7',
  jetski: '1688219039942-5f4bc1462664',
  yacht: '1768463852019-4881a17a1c0e',
  zipline: '1648853070657-6d58398bee93',
  campNight: '1527419105721-af1f23c86dec',
  camelRide: '1634470943099-29cf2b9d7ca1',
  familyBeach: '1597524678053-5e6fef52d8a3',
  scuba: '1544551763-46a013bb70d5',
  fountain: '1582120031356-35f21bf61055',
  paraglide: '1592208128295-5aaa34f1d72b',
} as const

export function img(id: string, alt: string, width = 1200): MediaAsset {
  return { url: U(id, width), alt }
}
