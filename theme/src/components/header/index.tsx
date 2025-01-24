import {
    SfIconShoppingCart,
    SfIconFavorite,
    SfIconPerson,
    SfIconClose,
    SfButton,
    SfDrawer,
    SfListItem,
    SfIconChevronRight,
    SfIconMenu,
    SfCounter,
    SfIconArrowBack,
    useDropdown,
    useTrapFocus,
    useDisclosure,
    SfInput,
    SfIconSearch, SfDrawerProps,
} from '@storefront-ui/react';
import {
    type FocusEvent,
    Fragment,
    useRef,
    useState,
    useMemo,
    createRef,
    RefObject,
    useEffect,
    ChangeEventHandler
} from 'react';
import {useRouter} from 'next/router';
import {useTheme} from "@/context/GlobalContext";
import Link from "next/link";
import { SfBadge } from '@storefront-ui/react';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";

import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {quantityCartSelector} from "@/store/slices/userSlice";
import {openWichList} from "@/store/slices/counterSlice";
import {useDispatch} from "react-redux";
import {cartProductsFiltred, deleteFilter} from '@/store/slices/productsSlice';

type Node = {
    key: string;
    value: {
        label: string;
        counter: number;
        link?: string;
        banner?: string;
        bannerTitle?: string;
    };
    url:string;
    children?: Node[];
    isLeaf: boolean;
};


const findNode = (keys: string[], node: Node): Node => {
    if (keys.length > 1) {
        const [currentKey, ...restKeys] = keys;
        return findNode(restKeys, node.children?.find((child) => child.key === currentKey) || node);
    }
    return node.children?.find((child) => child.key === keys[0]) || node;
};


export default function MegaMenuNavigation() {
    const dispatch=useDispatch()

    let lengthProductsWichList=useSelector((state: RootState) => state.wichList.wichListLength)

    // const [openWichList, setOpenWichlIST] = useState(false);
    const [placementState, setPlacement] = useState<SfDrawerProps['placement']>('left');

    const changePlacement: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setPlacement((event.target as HTMLSelectElement).value as SfDrawerProps['placement']);
    };

const authenticated=useSelector((state:RootState)=>state.user.auth)
console.log(authenticated)
    const Router = useRouter()

    console.log("Router", Router)
    const route=useRouter()
    const counterValue = useAppSelector(quantityCartSelector);
    console.log(counterValue)
    console.log("route", route);
    const [isOpenpanier, setIsOpenpanier] = useState<boolean>(false);
const isAuthenticated=useSelector((state:RootState)=>state.user.nameuser)
    console.log("isAuthenticated", isAuthenticated)
    const actionItems = [
        {
        // <SfIconFavorite/>
            icon: (
                <div className="relative"  variant="tertiary">
                    <SfIconShoppingCart />
                    <SfBadge content={100} max={counterValue} placement="bottom-right" />
                </div>),
            label: '',
            ariaLabel: 'Cart',
            role: 'button',
            action: () => {
                route.push("/panier/prod")
            }
        },
        {
            icon: (
                <div className="relative"  variant="tertiary">
                    <SfBadge content={100} max={lengthProductsWichList} placement="bottom-right" />
                    <SfIconFavorite/>
                </div>) ,
            label: '',
            ariaLabel: 'Wishlist',
            role: 'button',
            action:async()=>{
                await dispatch(openWichList(true));
                // console.log("is oky")
            }
        },
        {
            icon: (authenticated?( <div className="relative">
                {isAuthenticated}
            </div>) :( <SfIconPerson />)),
            label: 'Login',
            ariaLabel: 'Login',
            role:authenticated?'': 'login',
            action: () => {
                route.push(!authenticated?'/authentication/login/user':'/user/myprofile'); // Navigate to the login page
            },
        },
    ];

      // const {items} = useTheme();
    const items = useAppSelector((state: RootState) => state.categorie.items);
    console.log("asxsxaxsxsax",items)
    // if(cartId!==null){
    //
    // window.localStorage.setItem("cartId", cartId);
    // }
    //  console.log("items", items?.items[0]);
    // console.log("items", items);
    const [isHeading, setIsHeading] = useState(null);
     const [content,setContent] = useState([]);

    // console.log("isHeading", isHeading);
    const adaptToNode = (data: any): Node => {
        const transformChild = (child: any): Node => ({
            key: child.uid,
            url:child.url_key,
            value: {
                label: child.name,
                counter: child.product_count,
                link: child.url_path ? `${child.url_path}${child.url_suffix || ""}` : undefined,
            },
            children: child.children?.map(transformChild) || [],
            isLeaf: !child.children || child.children.length === 0,
        });

        return {
            key: data.uid || "root",
            value: {
                label: data.name || "",
                counter: data.product_count || 0,
            },
            url:data.url_key,
            children: data.children?.map(transformChild) || [],
            isLeaf: !data.children || data.children.length === 0,
        };
    };
    useMemo(() => {
        if (items[0]?.items[0]) {
            const adaptedContent = adaptToNode(items[0].items[0]); // Adapt the backend data
            setContent(adaptedContent);
        }
    }, [items]);
    console.log(content);
// console.log("content", content);
    const drawerRef = useRef(null);
    const megaMenuRef = useRef(null);
    const [activeNode, setActiveNode] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const refsByKey = useMemo(() => {
        const buttonRefs: Record<string, RefObject<HTMLButtonElement>> = {};
        content.children?.forEach((item) => {
            buttonRefs[item.key] = createRef();
        });
        return buttonRefs;
    }, [content.children]);

    const {close, open, isOpen} = useDisclosure();
    const {refs, style} = useDropdown({
        isOpen,
        onClose: (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                refsByKey[activeNode[0]]?.current?.focus();
            }
            close();
        },
        placement: 'bottom-start',
        middleware: [],
        onCloseDeps: [activeNode],
    });
    const dropdownStyle = {
        ...style,
        zIndex: 9999, // Ensure it has the highest stacking context
    };

    const trapFocusOptions = {
        activeState: isOpen,
        arrowKeysUpDown: true,
        initialFocus: 'container',
    } as const;
    useTrapFocus(megaMenuRef, trapFocusOptions);
    useTrapFocus(drawerRef, trapFocusOptions);

    const activeMenu = findNode(activeNode, content);
    const bannerNode = findNode(activeNode.slice(0, 1), content);

    const handleOpenMenu = (menuType: string[]) => () => {
        setActiveNode(menuType);
        open();
    };

    const handleBack = () => {
        setActiveNode((menu) => menu.slice(0, menu.length - 1));
    };

    const handleNext = (key: string) => () => {
        setActiveNode((menu) => [...menu, key]);
    };

    const handleBlurWithin = (event: FocusEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            close();
        }
    };

    const search = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`Successfully found 10 results for ${inputValue}`);
    };
        const [showNotification, setShowNotification] = useState(false);
          const cartItems = useSelector((state: RootState) => state.product.productNoticate);
          console.log(cartItems?.items?.slice(-1)[0])
    useEffect(() => {
        if (Object.keys(cartItems===undefined?"":cartItems).length > 0) {
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 8000); // Hide notification after 3 seconds
        }
    }, [cartItems]);

    function CartNotification() {


        return (
            <div
                className={`fixed top-15 right-5 p-4 bg-blue-600 text-white rounded-md shadow-lg transition-opacity duration-300 ${
                    showNotification ? "opacity-100" : "opacity-0"
                }`}
            >
                <header>
                    <SfButton
                        square
                        variant="tertiary"
                        className="!text-neutral-500 absolute right-2 top-2"
                        aria-label="Close product rating modal"
                        onClick={close}
                    >
                        <SfIconClose />
                    </SfButton>
                    <h3  className="font-bold typography-headline-4 md:typography-headline-3 mb-8">
                        Rate your purchase
                    </h3>
                </header>
                <img
                    src={cartItems?.items?.slice(-1)[0]?.product.thumbnail?.url}
                    alt="Smartwatch"
                    width="100"
                    height="100"
                    className="mx-auto border border-neutral-200 rounded-md"
                />
                <p  className="mt-2 text-center">
                    Smartwatch Fitness Tracker
                </p>

                <SfButton variant="tertiary" onClick={() => setShowNotification(false)}>
                    Close
                </SfButton>
            </div>
        );
    }


const router=useRouter()



    return (
        <>

            <div className="w-full h-full">
                <header  className="fixed top-0 left-0 w-full bg-blue-700 shadow-lg z-20 border-b border-neutral-200 h-auto md:h-25" ref={refs.setReference}>
                    <div
                        className="flex flex-wrap md:flex-nowrap justify-between items-center px-4 md:px-10 py-2 md:py-5 w-full border-0 bg-blue-700 border-neutral-200 h-full md:z-10">
                        <div className="flex items-center">
                            <SfButton
                                onClick={handleOpenMenu([])}
                                variant="tertiary"
                                square
                                aria-label="Close menu"
                                className="block md:hidden mr-5 bg-transparent hover:bg-primary-800 hover:text-white active:bg-blue-900 active:text-white"
                            >
                                <SfIconMenu className="text-white"/>
                            </SfButton>
                            <SfButton
                                onClick={(async() => {
                                    await Router.push('/');
                                })}
                                aria-label="SF Homepage"
                                className="flex shrink-0 w-8 h-8 lg:w-[12.5rem] lg:h-[1.75rem] items-center text-white focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                            >
                                <picture>
                                    <source
                                        srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg"
                                        media="(min-width: 1024px)"/>
                                    <img
                                        src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg"
                                        alt="Sf Logo"/>
                                </picture>
                            </SfButton>
                        </div>
                        <form role="search" className="hidden md:flex flex-[100%] ml-10" onSubmit={search}>
                            <SfInput
                                value={inputValue}
                                type="search"
                                className="[&::-webkit-search-cancel-button]:appearance-none"
                                placeholder="Search"
                                wrapperClassName="flex-1 h-10 pr-0"
                                size="base"
                                slotSuffix={
                                    <span className="flex items-center">
                  <SfButton
                      variant="tertiary"
                      square
                      aria-label="search"
                      type="submit"
                      className="rounded-l-none hover:bg-transparent active:bg-transparent"
                  >
                    <SfIconSearch/>
                  </SfButton>

                </span>
                                }
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                        </form>
                        <nav className="flex flex-nowrap justify-end items-center md:ml-10 gap-x-1">
                            {actionItems.map((actionItem) => (
                                <SfButton
                                    className="text-white bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
                                    key={actionItem.ariaLabel}
                                    aria-label={actionItem.ariaLabel}
                                    variant="tertiary"
                                    slotPrefix={actionItem.icon}
                                    square
                                    onClick={actionItem.action}
                                >
                                    {actionItem.role === 'login' && (
                                        <p className="hidden lg:inline-flex whitespace-nowrap mr-2">{actionItem.label}</p>
                                    )}


                                </SfButton>
                            ))}
                        </nav>
                        <form role="search" className="flex md:hidden flex-[100%] my-2" onSubmit={search}>
                            <SfInput
                                value={inputValue}
                                type="search"
                                className="[&::-webkit-search-cancel-button]:appearance-none"
                                placeholder="Search"
                                wrapperClassName="flex-1 h-10 pr-0"
                                size="base"
                                slotSuffix={
                                    <span className="flex items-center">
                  <SfButton
                      variant="tertiary"
                      square
                      aria-label="search"
                      type="submit"
                      className="rounded-l-none hover:bg-transparent active:bg-transparent"
                  >
                    <SfIconSearch/>
                  </SfButton>
                </span>
                                }
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                        </form>
                    </div>
                    {/* Desktop dropdown */}
                    <nav ref={refs.setFloating}>
                        <ul
                            className="hidden md:flex px-6 py-2 bg-white border-b border-b-neutral-200 border-b-solid justify-center"
                            onBlur={handleBlurWithin}
                        >
                            {content?.children?.map((menuNode) => (
                                <li key={menuNode.key}>
                                    {/*<p> {console.log(menuNode)} </p>*/}

                                    <SfButton
                                        variant="tertiary"
                                        onMouseEnter={handleOpenMenu([menuNode.key])}
                                        // onClick={handleOpenMenu([menuNode.key])}
                                        ref={refsByKey[menuNode.key]}
                                        onClick={(async () => {

                                            await route.push({
                                                pathname: `/categorie/${menuNode.url}`,
                                                query: {uid: menuNode.key}
                                            });
                                        })}
                                        className="group mr-2 !text-neutral-900 hover:!bg-neutral-200 hover:!text-neutral-700 active:!bg-neutral-300 active:!text-neutral-900"
                                    >
                                        <span>{menuNode.value.label}</span>
                                        <SfIconChevronRight
                                            className="rotate-90 text-neutral-500 group-hover:text-neutral-700 group-active:text-neutral-900"/>
                                    </SfButton>

                                    {isOpen && activeNode.length === 1 && activeNode[0] === menuNode.key && (
                                        <div
                                            key={activeMenu.key}
                                            style={{...style, zIndex: 9999}}
                                            ref={megaMenuRef}
                                            className="hidden md:grid gap-x-6 grid-cols-4 bg-white shadow-lg p-6 left-0 right-0 outline-none"
                                            tabIndex={0}
                                            onMouseLeave={close}
                                        >
                                            {activeMenu.children?.map((node) =>
                                                node.isLeaf ? (
                                                    <Fragment key={node.key}>

                                                        <Link size="sm"


                                                              href={{
                                                                  pathname: `/categorie/${menuNode.url}`,
                                                                  query: {uid: node.key}
                                                              }}


                                                              className="typography-text-sm mb-2">
                                                            {node.value.label}
                                                        </Link>
                                                        <div className="col-start-2 col-end-5"/>
                                                    </Fragment>
                                                ) : (

                                                    <div key={node.key}>
                                                        <p
                                                            style={{cursor: 'pointer'}}
                                                            onClick={(async()=>{
                                                                await router.push({
                                                                    pathname: `/categorie/${menuNode.url}`,
                                                                    query: {uid: node.key}
                                                                });
                                                            })}
                                                            className="typography-text-base font-medium text-neutral-900 whitespace-nowrap px-4 py-1.5 border-b border-b-neutral-200 border-b-solid">
                                                            {node.value.label}
                                                        </p>
                                                        <ul className="mt-2">
                                                            {node.children?.map(
                                                                (child) =>

                                                                    child.isLeaf && (
                                                                        <Link href={{
                                                                            pathname: `/categorie/${menuNode.url}/${child.url}`,
                                                                            query: {uid: child.key}
                                                                        }}>
                                                                            <li key={child.key}>

                                                                                <SfListItem
                                                                                    as="a"
                                                                                    size="sm"
                                                                                    // href={child.value.link}
                                                                                    // href={{
                                                                                    //     pathname: `/categorie/${menuNode.url}/${child.url}`,
                                                                                    //     query: {uid: child.key}
                                                                                    // }}
                                                                                    className="typography-text-sm py-1.5"

                                                                                >
                                                                                    {child.value.label}
                                                                                </SfListItem>
                                                                            </li>
                                                                        </Link>
                                                                    ),
                                                            )}
                                                        </ul>
                                                    </div>
                                                ),
                                            )}
                                            {/*<div*/}
                                            {/*    className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-100 border-neutral-300 grow">*/}
                                            {/*    <img*/}
                                            {/*        src={bannerNode.value.banner}*/}
                                            {/*        alt={bannerNode.value.bannerTitle}*/}
                                            {/*        className="object-contain"*/}
                                            {/*    />*/}
                                            {/*    <p className="px-4 mt-4 mb-4 font-medium text-center typography-text-base">*/}
                                            {/*        {bannerNode.value.bannerTitle}*/}
                                            {/*    </p>*/}
                                            {/*</div>*/}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {/* Mobile drawer */}
                    {isOpen && (
                        <>
                            <div className="md:hidden fixed inset-0 bg-neutral-500 bg-opacity-50"/>
                            <SfDrawer
                                ref={drawerRef}
                                open={isOpen}
                                // onClose={close}
                                placement="left"
                                className="md:hidden right-[50px] max-w-[376px] bg-white overflow-y-auto "
                                style={{zIndex: 9999}}
                            >
                                <nav>
                                    <div
                                        className="flex items-center justify-between p-4 border-b border-b-neutral-200 border-b-solid">
                                        <p className="typography-text-base font-medium">Browse products</p>
                                        <SfButton
                                            onClick={close}
                                            variant="tertiary" square aria-label="Close menu"
                                            className="ml-2">
                                            <SfIconClose className="text-neutral-500"/>
                                        </SfButton>
                                    </div>
                                    <ul className="mt-2 mb-6">
                                        {activeMenu.key !== 'root' && (
                                            <li>
                                                <SfListItem
                                                    size="lg"
                                                    as="button"
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="border-b border-b-neutral-200 border-b-solid"
                                                >
                                                    <div className="flex items-center">
                                                        <SfIconArrowBack className="text-neutral-500"/>
                                                        <p className="ml-5 font-medium">{activeMenu.value.label}</p>
                                                    </div>
                                                </SfListItem>
                                            </li>
                                        )}
                                        {activeMenu.children?.map((node) =>
                                            // console.log("node", node),
                                            node.isLeaf ? (
                                                <li key={node.key}>
                                                    <p>  {console.log(node)}</p>
                                                    <SfListItem size="lg"

                                                                href={{
                                                                    // pathname: `/categorie/${menuNode.url}`,
                                                                    pathname: `/categorie/${node.url}`,
                                                                    query: {uid: node.key}
                                                                }}


                                                        // href={`/categorie/${node.url}/${node.url}` }
                                                                className="first-of-type:mt-2">
                                                        <div className="flex items-center">
                                                            <p className="text-left">{node.value.label}</p>
                                                            <SfCounter className="ml-2">{node.value.counter}</SfCounter>
                                                        </div>
                                                    </SfListItem>
                                                </li>
                                            ) : (
                                                <li key={node.key}>
                                                    <p>  {console.log('hellojdjdjdjjj')}</p>
                                                    <SfListItem size="lg" as="button" type="button"
                                                                onClick={handleNext(node.key)}>
                                                        >
                                                        <div className="flex justify-between items-center">
                                                            <Link href={{
                                                                // pathname: `/categorie/${menuNode.url}`,
                                                                pathname: `/categorie/${node.url}`,
                                                                query: {uid: node.key}
                                                            }}>
                                                                <div className="flex items-center">
                                                                    <p className="text-left">{node.value.label}</p>{' '}
                                                                    <SfCounter
                                                                        className="ml-2">{node.value.counter}</SfCounter>
                                                                </div>
                                                            </Link>
                                                            <SfIconChevronRight className="text-neutral-500"/>
                                                        </div>
                                                    </SfListItem>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                    {bannerNode.value.banner && (
                                        <div
                                            className="flex items-center overflow-hidden bg-neutral-100 border-neutral-300 grow">
                                            <img
                                                src={bannerNode.value.banner}
                                                alt={bannerNode.value.bannerTitle}
                                                className="object-contain w-[50%] basis-6/12"
                                            />
                                            <p className="basis-6/12 p-6 font-medium typography-text-base">{bannerNode.value.bannerTitle}</p>
                                        </div>
                                    )}
                                </nav>
                            </SfDrawer>
                        </>
                    )}
                </header>


            </div>

            {/*<CartNotification/>*/}

            {/*<div className="bg-gray-50 min-h-screen flex flex-col items-center">*/}
            {/*    <h1 className="text-2xl font-bold text-center my-8">Our Partners</h1>*/}
            {/*    <div className="carousel-container w-full max-w-4xl">*/}
            {/*        <Slider {...settings}>*/}
            {/*            {logos.map((logo, index) => (*/}
            {/*                <div key={index} className="logo-card flex justify-center">*/}
            {/*                    <Image*/}
            {/*                        src={logo.src}*/}
            {/*                        alt={logo.alt}*/}
            {/*                        width={150}*/}
            {/*                        height={50}*/}
            {/*                        layout="intrinsic"*/}
            {/*                        objectFit="contain"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </Slider>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
        ;
};



