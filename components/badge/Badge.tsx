import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  badge: {
    name: string
    image: string
    userName?: string
  }
}

const BadgeCard = ({ badge }: Props) => {
  return (
    <Box
      textAlign="center"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        src={badge.image ?? "https://picsum.photos/200"}
        alt="Badge 1"
        boxSize="80px"
        borderRadius="20px"
      />

      <Text
        mt={2}
        color="white"
        fontWeight="bold"
        maxW="80%"
        mx="auto"
      >
        {badge.name}
      </Text>

      {badge.userName && (
        <Text color="gray.400" mx="auto">
          @{badge.userName}
        </Text>
      )}
    </Box>
  )
}

export default BadgeCard
