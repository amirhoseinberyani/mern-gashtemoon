import { Grid, Hidden, Typography } from '@mui/material'
import { translate } from 'localization'
import { useContext } from 'react'
import { SiteInfoContext } from '../../contexts/siteInfoContext'
import FooterExternalLinkSocialMedia from './SocialMediaLinks'
import FooterTitle from './FooterTitle'
import { vectors } from 'assets'

export default function Footer() {
  const { siteInfo } = useContext(SiteInfoContext)

  return (
    <Grid
      container
      margin='auto'
      borderTop={'1px solid #ccc'}
      mt={10}
      p={5}
      alignItems='baseline'
      justifyContent='space-between'
    >
      <Grid
        item
        display='flex'
        height='100%'
        md={4}
        width='max-content'
        flexDirection='column'
        justifyContent='flex-start'
      >
        <Typography variant='h6' mt={5}>
          Baloot Travel
        </Typography>

        <Typography variant='h6' mt={5}>
          ایده این پلتفرم گردشگری، ایجاد فضایی آنلاین برای نمایش جاذبه‌های طبیعی و فرهنگی ایران است
          که در آن کاربران می‌توانند اطلاعات جاذبه‌ها را ببینند، نظرات و تجربیات خود را به اشتراک
          بگذارند و راهنمایان گردشگری نیز با ارائه محتوای ارزشمند، محبوبیت و اعتبار کسب کنند. 🚀✨
        </Typography>
      </Grid>

      <Grid
        item
        display='flex'
        flexDirection='column'
        md={2}
        alignItems='flex-start'
        justifyContent='flex-start'
      >
        <Hidden mdDown>
          <Typography variant='h6' mt={5}>
            درباره ما
          </Typography>
          <Typography variant='h6' mt={5}>
            تماس با ما
          </Typography>
          <Typography variant='h6' mt={5}>
            خدمات
          </Typography>
          <Typography variant='h6' mt={5}>
            وبلاگ
          </Typography>
        </Hidden>
      </Grid>

      <Grid item display='flex' md={3} alignItems='center' justifyContent='flex-start'>
        <Hidden mdDown>
          <Grid xs={10}>
            <Typography variant='h6' mt={5}>
              ما را دنبال کنید
            </Typography>
            <Grid mt={5} container>
              <FooterExternalLinkSocialMedia
                icon={vectors.instagram}
                to={siteInfo?.footer?.instagram}
              />
              <FooterExternalLinkSocialMedia
                icon={vectors.telegram}
                to={siteInfo?.footer?.telegram}
              />
              <FooterExternalLinkSocialMedia
                icon={vectors.whatsapp}
                to={siteInfo?.footer?.whatsapp}
              />
              <FooterExternalLinkSocialMedia
                icon={vectors.youtube}
                to={siteInfo?.footer?.youtube}
              />
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  )
}
