import React, { useEffect, useState } from 'react'
import { Box, Image, Text, Grid, Center, Flex } from '@chakra-ui/react'
import toast from 'react-hot-toast'

type Props = {
  user: User
}

const ProfileCard = ({ user }: Props) => {
  const [privateCode, setPrivateCode] = useState<number | null>(null)

  useEffect(() => {
    const getPrivateCode = async () => {
      try {
        //TODO fetch the code and setPrivateCode with the response
      } catch (error) {
        console.log(error)
        toast.error('Failed to get private code')
      }
    }
    getPrivateCode()
  }, [])

  return (
    <Center justifyContent={'center'}>
      <Box
        w={{ base: '60%', md: '45%' }}
        h="auto"
        bg="transparent"
        borderRadius={'30px'}
        borderColor={'card.border'}
        borderWidth={0.5}
        p={4}
        boxShadow="lg"
      >
        <Grid
          templateColumns={{ base: '1fr', md: '120px 1fr' }}
          gap={4}
          alignItems="center"
        >
          <Box w="100%" h="120px" overflow="hidden" borderRadius="md">
            <Image
              src={user.user?.profilePicture ?? 'https://picsum.photos/200'}
              alt="Profile Image"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
          <Box color="white">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {user.user?.username}
              </Text>

              <Flex>
                <Image src="/images/home/LInlogo.png" alt="Linkedin Logo" boxSize="15px" mx={2} />
                <Image src="/images/home/xLogo.png" alt="X Logo" boxSize="15px" mx={2} />
                <Image src="/images/home/githubLogo.png" alt="Github Logo" boxSize="15px" mx={2} />
              </Flex>
            </Flex>

            <Text fontSize="md" color="gray.400">
              {user.user?.about ?? 'This is the bio of the user'}
            </Text>

            <Text fontSize="lg" fontWeight="bold" mt={2}>
              Secret Pin:{' '}
              <span style={{ color: '#00A3FF' }}>
                {privateCode ?? 'Loading . . .'}
              </span>
            </Text>
          </Box>
        </Grid>
      </Box>
    </Center>
  )
}

export default ProfileCard
