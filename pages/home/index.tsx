import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Center, Grid, Text } from "@chakra-ui/react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/router";
import Head from "next/head";
import toast from "react-hot-toast";

import { Happ3nEvent } from "../../src/models/Event";
import FeaturedEvent from "../../components/cards/FeaturedEvent";
import { PrivateGet, PublicFetch, PublicPost } from "../../src/utils/DataManagement";
import { useUser } from "../../context/userContext";
import ProfileCard from "../../components/home/ProfileCard";

const Home = () => {
  const { isConnected, address } = useAccount();
  const { user, setUser } = useUser();
  const [featuredEvents, setFeaturedEvents] = useState<Happ3nEvent[] | null>(
    null
  );
  const [selectedButton, setSelectedButton] = useState("explore");
  const [nonce, setNonce] = useState<string | null>(null);
  const [getToken, setGetToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { signMessage, data } = useSignMessage();

  //Login check /////////////////////////////
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (!isConnected) return;
    const token = localStorage.getItem("token");
    
    if (!token || token === undefined) {
      getNonce();
    } else {
      verifyToken();
    }
  }, [isConnected, getToken]);

  useEffect(() => {
    if (!data) return;
    loginUser(data);
  }, [signMessage, data]);

  const getNonce = async () => {
    try {
      console.log("getNonce");
      
      const response = await PublicPost("/auth/request-nonce", {
        address: address,
      });
      console.log("response", response);
      
      setNonce(response.nonce);
      signMessage({ message: response.nonce });
    } catch (error) {
      toast.error(
        "An error occurred while trying to login. Please tsry again later."
      );
    }
  };
  const verifyToken = async () => {
    try {
      const response = await PrivateGet("/auth/auto-login-user");
      setUser({
        isLogged: true,
        token: response.token,
        user: response.user,
      });
      toast.success("You have been logged in successfully.");
    } catch (error) {
      localStorage.removeItem("token");
      getNonce();
      toast.error(
        "An error occurred while trying to login. Please try again later."
      );
    }
  };
  const loginUser = async (data: any) => {
    try {
      const body = {
        address: address,
        nonce: nonce ?? "",
        signature: data,
      };
      const response = await PublicPost("/auth/login-user", body);
      localStorage.setItem("token", response.token);
      setUser({
        isLogged: true,
        token: response.token,
        user: response.user,
      });
      setGetToken(!getToken);
      toast.success("You have been logged in successfully.");
    } catch (error) {
      toast.error(
        "An error occurred while trying to login. Please try again later."
      );
    }
  };
  //Login check /////////////////////////////

  const onClickEvent = (id: string) => {
    const url = `/detail?id=${id}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <Fragment>
      <Head>
        <title>My Haps - By Happ3n</title>
        <meta name="Haps by happ3n" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box mt={"70px"} w={"100%"} h={"700px"}>
        {user && <ProfileCard 
          user={user}
        />}
        {featuredEvents && featuredEvents.length > 0 ? (
          loading ? (
            <Center h={"50vh"}>
              <Text
                fontSize="18px"
                textAlign="center"
                mt={2}
                mb={10}
                color={"white"}
              >
                Loading...
              </Text>
            </Center>
          ) : (
            <Center mt={100}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, minmax(0, 1fr))",
                }}
                gap={"30px"}
                mb={10}
              >
                {featuredEvents.map((event, index) => (
                  <div key={index} onClick={() => onClickEvent(event.id)}>
                    <FeaturedEvent event={event} />
                  </div>
                ))}
              </Grid>
            </Center>
          )
        ) : (
          <Text
            fontSize="18px"
            textAlign="center"
            mt={20}
            mb={10}
            color={"white"}
            w={"100%"}
          >
            No Haps to show.
          </Text>
        )}
      </Box>
      <Text fontSize="18px" textAlign="center" mt={2} mb={10} color={"#666666"}>
        By Happ3n
      </Text>
    </Fragment>
  );
};

export default Home;
