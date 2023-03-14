//Form using Formik , Yup and react-phone-number-Field

import CountryPhone from './phonePlugin/CountryPhone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupSchema } from './schemas';
import InputError from './InputError';
import { useTranslation } from "next-i18next";
import H6 from '../ui/h6';
import P from '../ui/p';


const initialValues = {

    fullName: "",
    emailId: "",
    phone: "",
    password: "",
    repeatPassword: "",
    robot: false
}

const SignUpForm2 = ({typeOfEntity}) => {

    const { t } = useTranslation();


    const onSubmit = v => {
        console.log(v);
    }

    const validatePhone = values => {
        let error;
        if (!values) {
            error = 'Required';
        }
        return error;
    }

    console.log(typeOfEntity);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={onSubmit}
        >
            {props => (
                <div className='flex flex-col w-full md:w-1/2 m-10 p-20'>
            

                    { typeOfEntity === 'personal' ?   <H6 text={t('personal')}></H6> : ( typeOfEntity === 'organization' ?  <H6 text={t('organization')}></H6> :   <H6 text={t('partner')}></H6>)}
                              
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

                        <label className='mt-6  text-gray-700' htmlFor="emailId">{t('emai_id')}</label>
                        <Field className='border border-gray-700 pl-3 h-10 rounded-md mt-2'
                            name='emailId'
                            type="text"
                            id="emailId"
                            placeholder={t('enter_here')}
                        />
                        <ErrorMessage name="emailId" component={InputError} />

                        <label className='mt-6  text-gray-700' htmlFor="phone">{t('phone')}</label>

                        <Field name="phone" component={CountryPhone} onChange={e => props.setFieldValue("phone", e)} validate={validatePhone}></Field>

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

                            {/* <div className='flex flex-col justify-items-center mr-2 my-4'>
                                <Image className='mx-auto' src='/ReCaptchaLogo.svg.png' width={60} height={60} alt="captcha here" />
                                <div className='flex flex-row'>
                                    <div className='text-xs'>Privacy - </div>
                                    <div className="text-xs ml-1">Terms</div>
                                </div>
                            </div> */}

                        </div>



                        <Field className=' border rounded-md bg-blue-600 text-white mt-4 py-2 w-24' name='submit' type="submit" value="Sign Up" />

                    </Form>
                </div>
            )
            }

        </Formik>

    )
}

export default SignUpForm2