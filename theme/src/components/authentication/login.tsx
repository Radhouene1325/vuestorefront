import {type ChangeEvent, type FormEvent, type KeyboardEvent, useState, useRef, useId, useEffect, useMemo} from 'react';
import {
    SfButton,
    SfInput,
    SfSelect,
    SfSwitch,
    SfCheckbox,
    SfRadio,
    SfIconEmail,
    SfIconExpandMore,
    useDisclosure,
    SfListItem,
    useTrapFocus,
    useDropdown,
    SfIconCheck,
    InitialFocusType, SfIconLockOpen, SfIconPerson,
} from '@storefront-ui/react';
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames';
import { offset } from '@floating-ui/react-dom';
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import authenticationuser from "@/utils/authentication";
import {authntication} from '@/store/slices/userSlice'
import {RootState} from "@/store";
import Newcount from "@/components/accountuser/profileuser/newcount";
type SelectOption = {
    email: string;
    password: string;
};

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { load } from "recaptcha-v3";
import {useTheme} from "@/context/GlobalContext";

export default function Loginuser() {
    const router=useTheme().router
    console.log(router)
    let dat = router.components !== undefined && router.components !== null ? Object?.values(router?.components)?.at(-1) : null;
    console.log(dat)
    const { trigger, data, error, isMutating } = useSWRMutation(
        `${BASEURL}/api/authentication/authentication`,
        authenticationuser.authentication
    );
    console.log(data)

    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [passwordInvalid, setPasswordIsInvalid] = useState(false);

const dispatch=useDispatch()





    const { close, toggle, isOpen } = useDisclosure();


    const { refs, style: dropdownStyle } = useDropdown({ isOpen, onClose: close });

    useTrapFocus(refs.floating, {
        arrowKeysUpDown: true,
        activeState: isOpen,
        initialFocus: InitialFocusType.autofocus,
    });




    const [visibolPassword,setVisibolPassword]=useState<boolean>(false)
     const visibol = () => {
        setVisibolPassword(!visibolPassword);
     }


    async function handleSubmit(event: FormEvent<HTMLFormElement>):Promise<SelectOption | undefined> {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')as string
        const password = formData.get('password')as string
        console.log(email, password);
        try {
          let data=  await trigger({ email:email,password:password }); // POST { name, email } to /api/send-data
            if (data) {

                dispatch(authntication(true));
                router.replace(router.asPath)
                // dispatch(authntication(true))
                // await router.push(dat?.resolvedAs);
                return { email, password };
            }
        } catch (err) {
            console.error('Error sending data:', err);
        }
    }

let isauth=useSelector((state:RootState)=>state.user.isAuth)
    console.log(error);
    console.log(data);


    const [personalInformation, setPersonalInformation] = useState<boolean>(false);

    const handelRegister=()=>{
        setPersonalInformation(!personalInformation)
    }

    const [open, setOpen] = useState(false)


    return (
        <>

            <>
                {
                    error&&(
                        <>
                            <div
                                role="alert"
                                className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
                            >
                                <p className="py-2 mr-2">email or password as not valide.</p>

                            </div>
                        </>
                    )
      }

                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="mx-auto h-10 w-auto"
                            />
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <div className="relative flex items-center">
                                            <SfIconEmail className="absolute left-3 text-gray-400" />
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                className="block w-full pl-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a
                                                style={{cursor: 'pointer'}}
                                                onClick={()=>setOpen(true)}

                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">

                                            <div className="relative flex items-center">
                                                <SfIconPerson className="absolute left-3 text-gray-400" />
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type={visibolPassword ? "text" : "password"}
                                                    required
                                                    autoComplete="current-password"
                                                    className="block w-full pl-10 pr-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                                <SfIconLockOpen
                                                    className="absolute right-3 text-gray-400 cursor-pointer"
                                                    onClick={visibol}
                                                />
                                            </div>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>

                            </form>

                                <button

                                    onClick={(async()=>{
                                        await  router.push({
                                            pathname: '/authentication/createAccount/register',
                                        })
                                    })}
                                    type="submit"
                                    className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create New Account
                                </button>

                            <p className="mt-10 text-center text-sm/6 text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Start a 14 day free trial
                                </a>
                            </p>
                        </div>
                    </div>

                <ReseetPassword open={open} setOpen={(value) => setOpen(value)} />

            </>


        </>
    );
}


const ReseetPassword = ({open, setOpen}: { open: boolean; setOpen: (value: boolean) => void }) => {


    const {trigger, data, error, isMutating} = useSWRMutation(
        `${BASEURL}/api/resepassword/enableReset/enableReset`,
        authenticationuser.authentication
    )
    const {trigger: UPDATEPASSWORD, data: NEWPASSWORD,error:ERROR, isMutating: ISMUTATINGPASSWORD} = useSWRMutation(
        `${BASEURL}/api/resepassword/isResetOky/isResetOky`,
        authenticationuser.authentication
    )

    const [isemail, setisemail] = useState<string>('');
    const handelReste = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let email = formData.get('email')
        setisemail(email as string)
        let password = formData.get('password')
        console.log (email)
        if(email){
            const recaptcha = await load("6LfkJcAqAAAAAGZ3QxMSR2iZbtYvSqed6z8W9Lr1"); // Your Site Key
            const newToken = await recaptcha.execute("requestPasswordResetEmail");
            console.log(recaptcha);
            //
            // console.log(newToken)
            await trigger({email, newToken});
        }
        else{
            const recaptcha = await load("6LfkJcAqAAAAAGZ3QxMSR2iZbtYvSqed6z8W9Lr1"); // Your Site Key
            const newToken = await recaptcha.execute("requestPasswordResetEmail");
            console.log(recaptcha);
            console.log(isemail)
            await UPDATEPASSWORD({isemail,password,newToken})
        }

    }

    // const result = useMemo((): { result: any } => {
    //
    //     return { result: null }; // Adjust 'null' based on actual expected value or structure
    // }, [data]);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel

                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <form onSubmit={handelReste}>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div
                                        className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600"/>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Resset Password
                                        </DialogTitle>
                                        <div className="mt-2 w-80 mx-auto">

                                            {!data?.data?.data?.requestPasswordResetEmail ?
                                                (
                                                    <label>
                                                        <span
                                                            className="text-sm font-medium w-1/2">write your email her</span>
                                                        <SfInput name='email' type='email' slotPrefix={<SfIconPerson/>}
                                                                 // slotSuffix={<SfIconLockOpen/>}
                                                        />
                                                    </label>
                                                )

                                                : (
                                                    <label>
                                                        <span
                                                            className="text-sm font-medium w-1/2">write NewPssaord</span>
                                                        <SfInput name='password' type='password' slotPrefix={<SfIconPerson/>}
                                                                 slotSuffix={<SfIconLockOpen/>}/>
                                                    </label>

                                                )


                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    // onClick={() => setOpen(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Reset Password
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );


};