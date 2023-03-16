import { useSession, signIn, signOut } from "next-auth/react";
import { useState} from "react";
import Radio from "@/components/form/radio";
import SimpleSlider from "@/components/signup/slider";
import SliderWrapper from "@/components/signup/slider-wrapper";
import Button from "@/components/form/button";
import H6 from "@/components/ui/h6";
import P from "@/components/ui/p";
import { Fragment } from "react";
import CommonButton from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const languages = [
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'hn',
        name: 'Hindi'
    },
   
]


function SignUp() {
    const  {t}  = useTranslation();
    const { data: session, loading} = useSession();
   
    const [toe, setToe] = useState("Personal");
    
    if (loading) {
        return <div>Loading...</div>
    }

    if (session) {

        let token;
    
        console.log(session);

        if(session.user.id){
            token = session.user.id;
        }else if(session.id_token){
            token = session.id_token;
        }

        
        return (
            <>
                Signed in as {session.user.email} <br />
               
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    function handleRadio(e) {
        setToe(e.target.value);
      
    }

    return (

        <Fragment >
            <div className="bg-white dark:bg-gray-800">
                <ul className="border flex">
                    {
                        languages.map(({ code, name }) => (
                            <li key={code}>
                                      <Link
                                      href='/'
                                      locale={code}
                                      >
                                        <button
                                    className="flex border m-2 p-2 rounded bg-blue-400 text-white">
                                    {name}
                                </button>
                                </Link>
                            </li>
                        ))
                    }
                </ul>

              <div className="container mx-auto sm:px-0 px-3">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-4 py-5 sm:gap-y-0 gap-y-3">
                        <div className=" min-h-custome rounded-xl overflow-hidden ">
                            <SliderWrapper background="../img/slider-bg.svg">
                               
                                <SimpleSlider />
                            </SliderWrapper>
                        </div>
                        <div className="self-center sm:px-6 xl:w-3/4">
                            <H6 text={t('sign_up')} />
                            <div className="flex pt-2">
                                <P>
                                    {t('having_an_account')}
                                    <span className="text-primary-600 font-semibold"> {t('sign_in')}</span> {t('here')}
                                </P>
                            </div>

                            <div className="lg:flex lg:space-x-3 mt-6 lg:space-y-0 space-y-3">
                                <P classNames="self-center">{t('sign_up')} {t('with')}</P>

                                <div className="flex space-x-3">
                                    <Button onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/Dashboard' })}>
                                        <img src="./img/github.svg" alt="github" className="h-9" />
                                    </Button>
                                    <Button onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/Dashboard' })}>

                                        <img src="./img/google.svg" alt="google" className="h-9" />
                                    </Button>



                                </div>
                            </div>

                            <div className="relative my-10">
                                <hr className=" " />
                                <p className="absolute left-1/2 transform -translate-x-1/2 px-4 bg-white -top-3">{t('or')}</p>
                            </div>
                            <P classNames="self-center">{t('what_are_you_looking_for')}</P>
                            <div className="flex space-x-3 py-4 mb-2">
                                <Radio id="personal" label={t('personal')} name="user-type" value="Personal" onClick={handleRadio} dc = {true}/>
                                <Radio id="organization" label={t('organization')} name="user-type" value="Organization" onClick={handleRadio} />
                                <Radio id="partner" label={t('partner')} name="user-type" value="Partner" onClick={handleRadio} />
                            </div>
                            <CommonButton color="primary-500">
                                <Link href={{
                                    pathname: '/[register]',
                                    query: { register: toe },
                                }}>
                                    {t('next')}
                                </Link>
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    }
}
export default SignUp;