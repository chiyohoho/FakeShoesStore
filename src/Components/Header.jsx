import { Box, Button, Container, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Input, InputGroup, InputLeftElement, Text, useDisclosure } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSearchOutline, IoHeartOutline, IoBagOutline, IoMenu, IoArrowUp, IoArrowForward, IoPlayForward, IoChevronForward, IoReorderFour, IoLogoXbox, IoLogoDropbox, IoStorefront, IoStorefrontOutline, IoHelpCircleOutline } from "react-icons/io5";
import { BsBox2, BsPersonFillExclamation } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { AppContext } from '../Context/AppContext';

const Header = () => {
    const navigation = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const { isLogin, setIsLogin, userData, setUserData, showToast, bagList, favList } = useContext(AppContext)

    const handleLogout = () => {
        localStorage.removeItem('USERLOGIN')
        setIsLogin(false)
        setUserData({})
        showToast('Đăng xuất thành công', 'Success', 'success')
        onClose()
        window.location.pathname === '/Favourite' ? navigation('/') : window.location.reload()
    }

    const handleRedirectToFavourite = () => {
        if (isLogin) {
            navigation('/Favourite')
        } else {
            showToast('Cảnh báo!', 'Vui lòng đăng nhập trước và thử lại', 'warning')
        }
    }

    useEffect(() => {
        const checkLocalstorage = JSON.parse(localStorage.getItem('USERLOGIN'));
        if (checkLocalstorage) {
            setUserData(checkLocalstorage)
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [isLogin]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            onClose()
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Box>
            <Box display={{ base: 'none', sm: 'none', md: 'block' }} bg={'#f5f5f5'}>
                <Container maxW={'95vw'}>
                    <Flex py={2} justifyContent={'space-between'}>
                        <Box onClick={() => navigation('/')}>
                            <svg height="24px" width="24px" fill="#111" viewBox="0 0 26 32">
                                <path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z">
                                </path>
                            </svg>
                        </Box>

                        <Flex fontWeight={500} gap={5} alignItems={'center'}>
                            <Text cursor={'pointer'}>
                                Find a Store
                            </Text>

                            <Divider height={'16px'} bg={'black'} width={'1px'} orientation='vertical' />

                            <Text cursor={'pointer'}>Help</Text>

                            <Divider height={'16px'} bg={'black'} width={'1px'} orientation='vertical' />

                            {!isLogin ?
                                <Flex alignItems={'center'} gap={5}>
                                    <Text cursor={'pointer'} onClick={() => navigation('/SignInOrJoinUs')}>Join Us</Text>

                                    <Divider height={'16px'} bg={'black'} width={'1px'} orientation='vertical' />

                                    <Text _hover={{ color: 'gray' }} cursor={'pointer'} onClick={() => navigation('/SignInOrJoinUs')}>Sign In</Text>
                                </Flex>
                                :
                                <Flex alignItems={'center'} gap={5}>
                                    <Box >Hello! <Text onClick={() => navigation('/Profile')} _hover={{ color: 'gray' }} display={'inline-block'} cursor={'pointer'} >{userData.firstname}</Text></Box>

                                    <Divider height={'16px'} bg={'black'} width={'1px'} orientation='vertical' />

                                    <Text _hover={{ color: 'gray' }} cursor={'pointer'} onClick={() => handleLogout()}>Sign Out</Text>
                                </Flex>
                            }
                        </Flex>
                    </Flex>
                </Container>
            </Box>

            <Box>
                <Container maxW={'95vw'}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                        <Box onClick={() => navigation('/')} ml={-2}>
                            <svg aria-hidden="true" className="pre-logo-svg" focusable="false" viewBox="0 0 24 24" role="img" width="72px" height="72px" fill="none"><path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd"></path></svg>
                        </Box>

                        <Box display={{ base: 'none', sm: 'none', md: 'block' }}>
                            <Flex alignItems={'center'} fontSize={18} className='nav_category' gap={5}>
                                <Text className='nav_cat'>New & Featured</Text>

                                <Text className='nav_cat'>Men</Text>

                                <Text className='nav_cat'>Women</Text>

                                <Text display={windowWidth < 900 ? 'none' : 'block'} className='nav_cat'>Kids</Text>

                                <Text display={windowWidth < 1000 ? 'none' : 'block'} className='nav_cat'>Sale</Text>

                                <Text display={windowWidth < 1100 ? 'none' : 'block'} className='nav_cat'>Customise</Text>

                                <Text display={windowWidth < 1200 ? 'none' : 'block'} className='nav_cat'>SNKRS</Text>
                            </Flex>
                        </Box>

                        <Flex gap={5} alignItems={'center'} justifyContent={'space-between'}>
                            <Box>
                                <InputGroup display={{ base: 'none', sm: 'none', md: 'block' }}>
                                    <InputLeftElement>
                                        <IoSearchOutline />
                                    </InputLeftElement>
                                    <Input width={160} overflow={'hidden'} bg={'#e5e5e5'} rounded={50} _hover={{ _placeholder: { color: 'black' } }} _placeholder={{ fontSize: '20px', color: '#ccc' }} placeholder='Search' />
                                </InputGroup>

                                <Box className='nav_icon' display={{ base: 'block', sm: 'block', md: 'none' }}>
                                    <Box p={2} fontSize={24}>
                                        <IoSearchOutline />
                                    </Box>
                                </Box>
                            </Box>


                            <Box onClick={handleRedirectToFavourite} className='nav_icon' display={{ base: 'none', sm: 'none', md: 'block' }}>
                                <Box pos={'relative'} px={2} pb={2} pt={2.5} fontSize={28}>
                                    <IoHeartOutline />
                                    <Text display={favList.length > 0 ? 'block' : 'none'} pos={'absolute'} content='""' fontSize={11.5} fontWeight={500}
                                        top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'} mt={'1px'}>
                                        {favList.length > 9 ? '9+' : favList.length}
                                    </Text>
                                </Box>
                            </Box>

                            <Box onClick={() => navigation('/Cart')} display={'block'} className='nav_icon'>
                                <Box pos={'relative'} p={2} fontSize={24}>
                                    <IoBagOutline />
                                    <Text display={bagList.length > 0 ? 'block' : 'none'} pos={'absolute'} content='""' fontSize={12} fontWeight={500}
                                        top={'50%'} left={'50%'} transform={'translate(-50%,-50%)'} mt={'3px'}>
                                        {bagList.length > 9 ? '9+' : bagList.length}
                                    </Text>
                                </Box>
                            </Box>

                            <Box className='nav_icon' display={{ base: 'block', sm: 'block', md: 'none' }}>
                                <Box onClick={() => navigation('/SignInOrJoinUs')} p={2} fontSize={20}>
                                    <FaRegUser />
                                </Box>
                            </Box>

                            <Box>
                                <Box ref={btnRef} onClick={onOpen} className='nav_icon' display={{ base: 'block', sm: 'block', md: 'none' }}>
                                    <Box p={2} fontSize={24}>
                                        <IoMenu />
                                    </Box>
                                </Box>

                                <Drawer
                                    isOpen={isOpen}
                                    placement='right'
                                    onClose={onClose}
                                    finalFocusRef={btnRef}
                                >
                                    <DrawerOverlay />

                                    <DrawerContent>
                                        <DrawerCloseButton />
                                        <DrawerHeader>
                                            <Box mt={10}>
                                                <Flex flexDir={'column'} fontSize={18} className='nav_category' gap={5}>
                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Text className='nav_cat_res'>New & Featured</Text>
                                                        <Box>
                                                            <IoChevronForward />
                                                        </Box>
                                                    </Flex>

                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Text className='nav_cat_res'>Men</Text>
                                                        <Box>
                                                            <IoChevronForward />
                                                        </Box>
                                                    </Flex>

                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Text className='nav_cat_res'>Women</Text>
                                                        <Box>
                                                            <IoChevronForward />
                                                        </Box>
                                                    </Flex>

                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Text className='nav_cat_res'>Kids</Text>
                                                        <Box>
                                                            <IoChevronForward />
                                                        </Box>
                                                    </Flex>

                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Text className='nav_cat_res'>Sale</Text>
                                                        <Box>
                                                            <IoChevronForward />
                                                        </Box>
                                                    </Flex>

                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Text className='nav_cat_res'>Customise</Text>
                                                        <Box>
                                                            <IoChevronForward />
                                                        </Box>
                                                    </Flex>

                                                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                        <Text className='nav_cat_res'>SNKRS</Text>
                                                        <Box>
                                                            <IoChevronForward />
                                                        </Box>
                                                    </Flex>
                                                </Flex>
                                            </Box>
                                        </DrawerHeader>

                                        <DrawerBody>
                                            <Flex mt={10} bg={'#ccc'} rounded={10} justifyContent={'center'} fontSize={20}>
                                                {!isLogin ?
                                                    <Flex alignItems={'center'} gap={5}>
                                                        <Text cursor={'pointer'} onClick={() => navigation('/SignInOrJoinUs')}>Join Us</Text>

                                                        <Divider height={'16px'} bg={'black'} width={'1px'} orientation='vertical' />

                                                        <Text _hover={{ color: 'gray' }} cursor={'pointer'} onClick={() => navigation('/SignInOrJoinUs')}>Sign In</Text>
                                                    </Flex>
                                                    :
                                                    <Flex alignItems={'center'} gap={5}>
                                                        <Box >Hello! <Text onClick={() => navigation('/Profile')} _hover={{ color: 'gray' }} display={'inline-block'} cursor={'pointer'} >{userData.firstname}</Text></Box>

                                                        <Divider height={'16px'} bg={'black'} width={'1px'} orientation='vertical' />

                                                        <Text _hover={{ color: 'gray' }} cursor={'pointer'} onClick={() => handleLogout()}>Sign Out</Text>
                                                    </Flex>
                                                }
                                            </Flex>

                                            <Flex justifyContent={'center'} mt={20} >
                                                <Flex flexDir={'column'} gap={4} >
                                                    <Flex cursor={'pointer'} gap={2} alignItems={'center'}>
                                                        <Box fontSize={24}>
                                                            <IoBagOutline />
                                                        </Box>
                                                        <Text fontSize={20} fontWeight={500}>Bag</Text>
                                                    </Flex>

                                                    <Flex cursor={'pointer'} gap={2} alignItems={'center'}>
                                                        <Box fontSize={22}>
                                                            <BsBox2 />
                                                        </Box>
                                                        <Text fontSize={20} fontWeight={500}>Orders</Text>
                                                    </Flex>

                                                    <Flex cursor={'pointer'} gap={2} alignItems={'center'}>
                                                        <Box fontSize={24}>
                                                            <IoStorefrontOutline />
                                                        </Box>
                                                        <Text fontSize={20} fontWeight={500}>Find a Store</Text>
                                                    </Flex>

                                                    <Flex cursor={'pointer'} gap={2} alignItems={'center'}>
                                                        <Box fontSize={30} ml={-1}>
                                                            <IoHelpCircleOutline />
                                                        </Box>
                                                        <Text fontSize={20} fontWeight={500}>Help</Text>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </DrawerBody>
                                    </DrawerContent>
                                </Drawer>
                            </Box>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </Box>
    )
}

export default Header