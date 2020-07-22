import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    email: yup
        .string()
        .email("Email must be valid")
        .required("Email must be required"),
    password: yup
        .string(),
    terms: yup
        .string()
})


export default formSchema