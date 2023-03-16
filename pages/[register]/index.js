
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CountryPhone from '../../components/registration/phonePlugin/CountryPhone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupSchema } from '../../components/registration/schemas';
import InputError from '../../components/registration/InputError';
import { useTranslation } from "next-i18next";
import H6 from '../../components/ui/h6';
import P from '..//../components/ui/p';
import axios from 'axios';
const initialValues = {

    fullName: "",
    emailId: "",
    phone: "",
    password: "",
    repeatPassword: "",
    robot: false
}


const Register = () => {

    const router = useRouter();
    const typeOfEntity = router.query.register;
    const { t } = useTranslation();

    
    const onSubmit = v => {

        // console.log(v)
        const data = {

            name: v.fullName,
            email: v.emailId,
            password: v.password,
            phone: "1234567890",
            country_code: "91",
            entity_type: typeOfEntity
        }

        console.log(data);
        axios.post('https://avatar.stackconsole.io/api/register'
            , data
            ,{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    // 'X-Requested-With': 'XMLHttpRequest',
                    // 'X-CSRF-TOKEN': window.csrf_token
                }
            }
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const validatePhone = values => {
        let error;
        if (!values) {
            error = 'Required';
        }
        return error;
    }

    return (


        <Formik
            initialValues={initialValues}
            // validationSchema={signupSchema}
            onSubmit={onSubmit}
        >
            {props => (
                <div className='flex flex-col w-full md:w-1/2 m-10 p-20'>

                    {typeOfEntity === 'Personal' ? <H6 text={t('personal')}></H6> : (typeOfEntity === 'Organization' ? <H6 text={t('organization')}></H6> : <H6 text={t('partner')}></H6>)}

                    <H6 text={t('sign_up')} />
                    <div className="flex pt-2">
                        <P>
                            {t('having_an_account')}
                            <span className="text-primary-600 font-semibold"> {t('sign_in')}</span> {t('here')}
                        </P>
                    </div>

                    <Form className='flex flex-col' autoComplete="off">

                        <label className='mt-6  text-gray-700' htmlFor="fullName">{t('full_name')}</label>
                        <Field className='border border-gray-700 pl-3 h-10 rounded-md mt-2'
                            name='fullName'
                            type="text"
                            id="fullName"
                            placeholder={t('enter_here')}
                        />
                        <ErrorMessage name="fullName" component={InputError} />

                        <label className='mt-6  text-gray-700' htmlFor="emailId">{t('email_id')}</label>
                        <Field className='border border-gray-700 pl-3 h-10 rounded-md mt-2'
                            name='emailId'
                            type="text"
                            id="emailId"
                            placeholder={t('enter_here')}
                        />
                        <ErrorMessage name="emailId" component={InputError} />

                        <label className='mt-6  text-gray-700' htmlFor="phone">{t('phone')}</label>
                        <Field name="phone" 
                        component={CountryPhone} 
                        onChange={e => props.setFieldValue("phone", e)} 
                        validate={validatePhone}>

                        </Field>

                        <ErrorMessage name="phone" component={InputError} />

                        <label className='mt-6  text-gray-700' htmlFor="password">{t('password')}</label>
                        <Field className='border border-gray-700 pl-3 h-10 rounded-md mt-2'
                            name='password'
                            type="text"
                            id="password"
                            placeholder={t('enter_here')}

                        />
                        <ErrorMessage name="password" component={InputError} />

                        <label className='mt-6  text-gray-700' htmlFor="password2">{t('repeat_password')}</label>
                        <Field className='border border-gray-700 pl-3 h-10 rounded-md mt-2'
                            name='repeatPassword'
                            type="text"
                            id="password2"
                            placeholder={t('enter_here')}
                        />
                        <ErrorMessage name="repeatPassword" component={InputError} />
                        <div className='flex justify-between border-4 border-gray-400 bg-slate-100 mt-4'>
                            <div className='grid grid-cols-3 content-center'>
                                <Field className='h-5 w-5 ml-4'
                                    type="checkbox"
                                    id="humanVerification"
                                    name='robot'

                                />
                                <label className='col-span-2' htmlFor="humanVerification">{t('robot')}</label>
                            </div>
                        </div>
                        <Field className=' border rounded-md bg-blue-600 text-white mt-4 py-2 w-24'
                            name='submit'
                            type="submit"
                            value="Sign Up" />
                    </Form>
                </div>
            )
            }
        </Formik>

    )
}

export async function getStaticPaths() {
    return {
        paths: [

            // Object variant:
            { params: { register: 'personal' }, },
            { params: { register: 'organization' }, },
            { params: { register: 'partner' }, },
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
export default Register