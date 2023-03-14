import React from 'react'
import SignUpForm2 from '@/components/registration/SignUpForm2';
import {useRouter} from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
const register = () => {

  const router = useRouter();
const {t} = useTranslation();
  const toe = router.query.register;

  return (
    <div>
        <SignUpForm2 typeOfEntity={toe}></SignUpForm2>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      
      // Object variant:
      { params: { register: 'personal' },},
      { params: { register: 'organization' },},
      { params: { register: 'partner' },},
    ],
    fallback: true,
  }
}

export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, ['common'])),
          // Will be passed to the page component as props
      },
  }
}
export default register