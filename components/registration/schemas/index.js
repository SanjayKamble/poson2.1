import * as Yup from 'yup';

export const signupSchema = Yup.object({

    nameOfOrganization: Yup.string().min(2).max(100).required("Enter organization name here"),
    fullName: Yup.string().min(2).max(25).required("Enter full name here"),
    emailId:Yup.string().email().required("Enter email here"),
    password:Yup.string().min(8).required("Enter password here"),
    repeatPassword:Yup.string().required()
    .oneOf([Yup.ref("password"),null],"Pasword must match")
})

