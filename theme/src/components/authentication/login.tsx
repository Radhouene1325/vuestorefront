import { type ChangeEvent, type FormEvent, type KeyboardEvent, useState, useRef, useId, useEffect } from 'react';
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
import {useDispatch}from 'react-redux'
import classNames from 'classnames';
import { offset } from '@floating-ui/react-dom';
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import authenticationuser from "@/utils/authentication";
import {useRouter} from "next/router";
import {authntication} from '@/store/slices/userSlice'
type SelectOption = {
    email: string;
    password: string;
};


export default function Loginuser() {
    const router=useRouter()

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


    async function handleSubmit(event: FormEvent<HTMLFormElement>):Promise<SelectOption> {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')as string
        const password = formData.get('password')as string
        console.log(email, password);
        try {
          let data=  await trigger({ email:email,password:password }); // POST { name, email } to /api/send-data
            if (data) {

                // dispatch(authntication(true))
                await router.push('/');
            }
        } catch (err) {
            console.error('Error sending data:', err);
        }

    }


    return (
        <div className="px-4">
            <h1 className="mb-4 typography-headline-4 font-bold">Personal information</h1>
            <form onSubmit={handleSubmit}>

                <label className="block my-4">
                    <span className="typography-label-sm font-medium">Email *</span>
                    <SfInput

                        type="email"
                        name="email"
                        required
                        invalid={emailIsInvalid}
                        slotPrefix={<SfIconEmail/>}
                        // onInput={() => (email ? setEmailIsInvalid(false) : setEmailIsInvalid(true))}
                        // onBlur={() => (email ? setEmailIsInvalid(false) : setEmailIsInvalid(true))}
                        // onChange={(event) => setEmail(event.target.value)}
                    />
                    {emailIsInvalid && (
                        <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">The field cannot be
                            empty</p>
                    )}
                </label>

                <label className="block my-4">
                    <span className="typography-label-sm font-medium">Password *</span>
                    <SfInput

                        name="password"
                        type={visibolPassword?"text":"password"}
                        required
                        slotPrefix={<SfIconPerson />} slotSuffix={<SfIconLockOpen onClick={visibol} />}
                        // onInput={() => (email ? setPasswordIsInvalid(false) : setPasswordIsInvalid(true))}
                        // onBlur={() => (email ? setPasswordIsInvalid(false) : setPasswordIsInvalid(true))}
                        // onChange={(event) => setEmail(event.target.value)}
                    />
                    {passwordInvalid && (
                        <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">The field cannot be
                            empty</p>
                    )}
                </label>

                <div className="flex gap-x-4 md:justify-end mt-6">
                    <SfButton variant="secondary" className="flex-grow md:flex-grow-0">
                        Clear all
                    </SfButton>
                    <SfButton type="submit" className="flex-grow md:flex-grow-0">
                        Submit
                    </SfButton>
                </div>
            </form>
        </div>
    );
}
