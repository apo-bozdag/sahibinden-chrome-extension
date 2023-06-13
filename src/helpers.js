'use strict';
import { damageTypeEnum } from "@/enums";

export function reformattedContent(content) {
  let value = content;
  const turkish = 'çğıöşüÇĞİÖŞÜ';
  const english = 'cgiosuCGIOSU';
  for (let i = 0; i < turkish.length; i++) {
    value = value.replace(new RegExp(turkish[i], 'g'), english[i]);
  }
  value = value.toLowerCase();
  value = value.replace(/(\r\n|\n|\r)/gm, ' ');
  value = value.replace(/(\(|\))/gm, ' ');
  value = value.replace(/\s+/g, ' ');
  value = value.replace(/₺| tl | ytl /gi, '');
  value = value.replace(/\.|,/g, ' ');
  value = value.replace(/;|=|:|-|!|\?|\(|\)|\[|\]|\{|\}|<|>|\||\/|\\|'|`|~|\^|%|\$|#|@|&|\*|\+|-/g, ' ');
  value = value.replace(/  +/g, ' ');
  return value;
}

export function is_damage(description) {
  // if return 0 then no damage else if 1 then severe damage else if 2 then minor damage
  const severe_damage = ['agir hasar','agr hasarl',
    'agir hasar kaydi \\d+(\\.\\d+)*', 'erp-agir hasarli', 'agir hasar kaydi cikmaktadir',
    'kaporta hasarindan dolayi agir hasar vardir', 'aracimin pert kaydi vardir',
    'arac pert kayitli ', ' hasar kayitlidir', 'aracta pert kaydi mevcuttur',
    'az hasarli, calisir', 'arac pert kayitliymis', 'pert kaydi var',
    'agir hasarli', 'agir hasar kayitli', 'agir hasar cikmaktadir',
    '(agir hasar) kayit', 'agir kayit vardir', 'agir hasar olusmus',
    'agir hazar kaydi var', 'agir hasar kaydi var', 'agir hasarli',
    'agi̇r hasar kaydi̇ vardi̇r', 'agir hasarlidir', 'agi̇r hasarli', 'sisirme agir',
    'agir hasar kaydi gelmekte', 'bedelsiz agir',
    'agir hasar kayitlidir', 'agir hasar var',
    'agir hasar gozukuyor', 'bedelsiz agir',
    'airbag acmis', 'airbag acildi', 'airbag patla', 'hasar kaydi agir hasar',
    'agir kayitli', 'ag[A-Za-z]+r hasar kay[A-Za-z]+t',
    '\\d+(\\.\\d+)* agir hasar', 'agir hasar \\d+(\\.\\d+)*',
    'tramer agir \\d+(\\.\\d+)*', 'trameragir \\d+(\\.\\d+)*',
    'arabam agirhasarli', 'arabam agir hasarli',
    'agri hasar var', 'bin agri hasar', 'agir hasir kayitlidir', 'agir'
  ]
  const light_damage = ['hasar kaydi bulunmakta', 'aracimizin bazi sorunlari vardir',
    'aracimizda hasar kaydi vardir', ' hasar kaydi var', ' hasar kayitli ',
    'aracimiz hs kayitlidir', ' calinti buluntu kaydindan ', 'aracta agar hasar gozukmek',
    'hasar kaydina takintisi olmayanlar', 'hasar kayitlidirarac', 'hasar kaydi vardir',
    ' hasarli bir sekilde aldim', 'arac sigortadan anlasmali', 'tl hasar kayitli',
    'tl hasar kaydi cikar', 'tl tramer kaydi var', 'tlhasar kaydi var ', 'yle hasari var',
    'hasar kayitlidir', 'hasar kaydi mevcut', 'hasar kaydi bu yuzdendir',
    'dolayi hasar kaydi cikmakta', 'calisir yürür durumdadir', 'tramer parca parca',
    'tramer kaydi var', 'tramer kaydi vardir', 'tramer kaydi mevcuttur',
    'tramer kaydi cikmaktadir', 'tramer kaydi cikar', 'tramer kaydi bulunmakta',
    'tramer vardir', 'parca parca tramer kaydi', 'parca parca tramer',
    'parca parca hasar kaydi', 'parca parca hasar', 'parca parca hasar kaydi',
    'tramer \\d+(\\.\\d+)*', 'hasar kaydi \\d+(\\.\\d+)*', 'parca parca \\d+(\\.\\d+)*',
    'tek parca', 'tek parca \\d+(\\.\\d+)*', 'tramer kaydi:', 'hasar bulunmakta',
    'erp carpma', 'hasar sorgulamasi resimlerde', 'tramer kaydi:',
    'hasar sorgulamasi resi̇mlerde', 'hasar kaydi sorgulamasi fotograflarda',
    'son tramer kaydi', 'tramer kaydi : \\d+(\\.\\d+)*', '\\d+(\\.\\d+)* tramer var',
    '\\d+(\\.\\d+)* tramer kaydi', 'tramer:\\d+(\\.\\d+)*', 'tramer: \\d+(\\.\\d+)*',
    'tramer : \\d+(\\.\\d+)*', 'tramer ve ekspertiz bilgileri', 'tramer mevcuttur',
    'tarihli hasar', 'agir hasar kaydi yoktur', 'agir hasar yoktur', 'agi̇r hasar yoktur',
    'normal kayit', 'normal kayit vardir', 'hasar kayitli aldim', 'carpma \\d+(\\.\\d+)*',
    'hasar kaydi resi̇mlerde', 'tramer sorgusu resimlerde', 'carpma kaydi', 'trameri vardir',
    'tramer cikmaktadir', 'tramer kaydi parca', 'tramer kaydi parca parca',
    'hasar kaydi: \\d+(\\.\\d+)*', 'hasar kaydi : \\d+(\\.\\d+)*', 'hasar kaydi :\\d+(\\.\\d+)*',
    'parca halinde', 'parca hali̇nde', 'parca parca kayit', 'hasar kaydi :', 'bin tramer',
    'tl tramer', 'tramer\\d+(\\.\\d+)*', 'hasar sorgusu resimlerde',
    'tramer = \\d+(\\.\\d+)*', 'tramer =\\d+(\\.\\d+)*', 'tramer = \\d+(\\.\\d+)*',
    'tramer=\\d+(\\.\\d+)*', 'tramer= \\d+(\\.\\d+)*', 'hasar kaydi ise', 'hasar kaydi yalnizca',
    'adet carpma', '\\d+(\\.\\d+)* hasar kaydi', '\\d+(\\.\\d+)*hasar kaydi', 'kayit parca',
    'bin kayit', '\\d+(\\.\\d+)* tremer', 'tremer \\d+(\\.\\d+)*', '\\d+(\\.\\d+)*tremer',
    'hasar:', 'hasar kaydi ekliyorum', 'tramer \\d+(\\.\\d+)*',
    'kaydi \\d+(\\.\\d+)*', 'kaydi :\\d+(\\.\\d+)*', 'kaydi: \\d+(\\.\\d+)*',
    'kaydi:\\d+(\\.\\d+)*', 'kayit vardir', 'tramer; \\d+(\\.\\d+)*',
    'tramer;\\d+(\\.\\d+)*', 'pert kaydi yoktur', 'tremer kaydi var',
    'hasar sms', 'hasar resim', 'hasar sorgulama fot', 'hasar fot', 'tramer kaydi sadece',
    'tramer resimlerde', '\\d+(\\.\\d+)*tramer', 'tirameri var', 'ramer kaydi resim',
    'lira tramer', 'hasar \\d+(\\.\\d+)*', 'bin hasar kaydi', 'bin tl hasar', 'bn tl tramer'
  ]
  const changed = ['degisen olup', 'degisen var', 'camurluk degisen', 'kapi degisen',
'kaput degisen', 'far degisen', 'bagaj degisen', 'bagaj kapagi degisen', 'bagaj kapak degisen', 'degisim'
]

  const severe_damage_regex = new RegExp(severe_damage.join('|'), 'i');
  const light_damage_regex = new RegExp(light_damage.join('|'), 'i');
  const changed_regex = new RegExp(changed.join('|'), 'i');

  let return_value = damageTypeEnum.CLEAR;
  if (severe_damage_regex.test(description)) {
    return_value = damageTypeEnum.SEVERE;
  } else if (light_damage_regex.test(description)) {
    return_value = damageTypeEnum.LIGHT;
  } else if (changed_regex.test(description)) {
    return_value = damageTypeEnum.CHANGED;
  }

  return return_value;
}

export function is_painted(description) {
  // if the car is painted, return 1, else return 0
  const painted = [
    'boyali', 'boyali arac', 'boyali aracimiz', 'boyali aracimizdir',
    '\\d+(\\.\\d+)* parca boyali', 'lokal boyali', 'lokal boyali arac',
    'lokal boyali aracimiz', 'lokal', 'cizik boyasi', 'boyasi vardir', 'parca boya',
    'boyali\\d+(\\.\\d+)*', 'boyali \\d+(\\.\\d+)*',
    'alti boya', 'boyasi mevcut', 'boya var', 'boyanmistir', 'boya vr', 'boya takintisi',
    'boya mevcut', 'temizlik boyasi', 'boyalari var',
    '\\d+(\\.\\d+)* boya', 'boyalar mevcut', 'boyalari mevcut', 'boyanmis'
  ]

  const painted_regex = new RegExp(painted.join('|'), 'i');
  const is_painted = painted_regex.test(description);

  let return_value = 0;
  if (is_painted) {
    return_value = 1;
  }

  return return_value;
}

export function custom_style() {
  // banneri kaldiralim
  const header_banners = document.querySelector('.header-banners');
  if (header_banners) {
    header_banners.remove();
  }

  // ilan listesi arasindaki reklamlari silelim
  const nativeAd = document.querySelectorAll('.searchResultsItem.nativeAd');
  if (nativeAd) {
    nativeAd.forEach((item) => {
      item.remove();
    });
  }
  
  // ilan listesi arasindaki uyarilari silelim
  const promoTopList = document.querySelectorAll('.searchResultsPromoToplist');
  if (promoTopList) {
    promoTopList.forEach((item) => {
      item.remove();
    });
  }
}

export function open_settings() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}
