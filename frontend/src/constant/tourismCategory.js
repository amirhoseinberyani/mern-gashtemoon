const attractionTypes = [
  {
    typeId: 1,
    title: 'طبیعی',
    children: [
      {
        title: 'آب و هوا',
        typeId: 101,
      },
      {
        title: 'چشم انداز',
        typeId: 102,
      },
      {
        title: 'نواحی ساحلی و دریایی',
        typeId: 103,
      },
      {
        title: 'پوشش گیاهی و حیات جانوری',
        typeId: 104,
      },
      {
        title: 'ویژگی‌های برجسته زیست‌محیطی',
        typeId: 105,
      },
      {
        title: 'پارک‌ها و مناطق حفاظت‌شده',
        typeId: 106,
      },
      {
        title: 'گردشگری سلامت',
        typeId: 107,
      },
      {
        title: 'چشمه‌های آب معدنی و آب گرم',
        typeId: 108,
      },
      {
        title: 'تفرج‌گاه‌های رژیم غذایی و سلامت فیزیکی',
        typeId: 109,
      },
    ],
  },
  {
    typeId: 2,
    title: 'فرهنگی',
    children: [
      {
        title: 'منزل‌گاه‌های فرهنگی، تاریخی و باستانی',
        typeId: 201,
      },
      {
        title: 'الگوهای شاخص و برجسته فرهنگی',
        typeId: 202,
      },
      {
        title: 'صنایع دستی و هنرها',
        typeId: 203,
      },
      {
        title: 'فعالیت‌های اقتصادی جالب توجه: مزارع چای، از تکنیک‌های سنتی کشاورزی و ماهیگیری',
        typeId: 204,
      },
      {
        title: 'نواحی جذاب شهری',
        typeId: 205,
      },
      {
        title: 'موزه‌ها و سایر تسهیلات فرهنگی',
        typeId: 206,
      },
      {
        title: 'رویدادها و جشن‌واره‌های فرهنگی',
        typeId: 207,
      },
      {
        title: 'مهرورزی و ویژگی‌های رفتاری ساکنان منطقه',
        typeId: 208,
      },
    ],
  },
  {
    typeId: 3,
    title: 'ویژه',
    children: [
      {
        title: 'پارک‌های مصنوعی و پارک‌های سرگرم‌کننده و سیرک‌ها',
        typeId: 301,
      },
      {
        title: 'خرید',
        typeId: 302,
      },
      {
        title: 'کنفرانس، همایش و نشست‌ها',
        typeId: 303,
      },
      {
        title: 'رویدادهای خاص',
        typeId: 304,
      },
      {
        title: 'تفریح و سرگرمی',
        typeId: 305,
      },
      {
        title: 'ورزش و تفریحات ورزشی',
        typeId: 306,
      },
    ],
  },
  {
    typeId: 4,
    title: 'سایر',
    children: [
      {
        title: 'خدمات و تسهیلات جهانگردی به عنوان یکی از عوامل انگیزشی و جاذبه برای جهانگردی',
        typeId: 401,
      },
      {
        title: 'هتل‌ها و تفرج‌گاه‌ها',
        typeId: 402,
      },
      {
        title: 'حمل و نقل',
        typeId: 403,
      },
      {
        title: 'خوراک و نوشیدنی',
        typeId: 404,
      },
      {
        title: 'قوم، مذهب و وابستگی‌های وطنی',
        typeId: 405,
      },
      {
        title: 'هزینه‌های ارزان مسافرت',
        typeId: 406,
      },
      {
        title: 'ثبات سیاسی، سلامت و امنیت و سایر ملاحظات',
        typeId: 407,
      },
      {
        title: 'سایر',
        typeId: 408,
      },
    ],
  },
]

export default attractionTypes
