import React, { useEffect, useState, useMemo} from "react";
import {Box,Stack,Image,Text,Link,Spinner,} from "@chakra-ui/react";
import styled from "styled-components";
import getNowPlayingItem from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";
import PlayingAnimation from "./PlayingAnimation";
import BooksGrid from "../GoodReads";
import axios from 'axios';
import OuraRingLogo from "../OuraRingLogo";
import '../styles.css';


function secondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours + " hours " + minutes + " minutes";
}

const SpotifyNowPlaying = (props) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});
  const [sleepData, setSleepData] = useState({});
  const [sleepDate, setSleepDate] = useState({});
  
  let date = new Date();
  date.setDate(date.getDate()-1 );

  //console.log(`Querying data for ${date.toISOString().slice(0, 10)}`);

  const sleepDataText = useMemo(() => {
    return `Sleep: ${secondsToHoursMinutes(sleepData.total_sleep_duration)}`;
  }, [sleepData.total_sleep_duration]);

  useEffect(async () => {
    Promise.all([
      getNowPlayingItem(
        props.client_id,
        props.client_secret,
        props.refresh_token
      ),

    ]).then((results) => {
      setResult(results[0]);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching now playing item:", error);
      setLoading(false);
    });

    try {
      const response = await axios.get('/api/getSleepData');
      console.log(response);
      setSleepData(response.data);

      setSleepDate(response.data.date);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const renderNowPlayingItem = () => {
    if (result.type === "track" &&result.isPlaying ) {
      return (
        <Box p={2} borderRadius="lg" borderWidth={1}>
          <Stack direction="row" spacing={4} align="center">
            <Image
              alt={`${result.title} album art`}
              src={result.albumImageUrl}
              width={12}
              height={12}
              borderRadius="sm"
            />
            <Stack spacing={0} overflow="hidden">
              <Link href={result.songUrl} target="_blank">
                <Text
                  fontWeight="semibold"
                  width="full"
                  isTruncated
                  color="alph"
                >
                  {result.title}
                </Text>
              </Link>
              <Text
                color="gray.500"
                isTruncated
              >
                {result.artist}
              </Text>
              <Text></Text>
            </Stack>
          </Stack>
        </Box>
      );
    } else if (result.type === "episode") {
      const showImage = result.podcastImageUrl;
      const showTitle = result.showName;
      return (
        <Box p={2} borderRadius="lg" borderWidth={1}>
          <Stack direction="row" spacing={4} align="center">
            <Image
              alt={`${showTitle} podcast art`}
              src={showImage}
              width={12}
              height={12}
              borderRadius="sm"
            />
            <Stack spacing={0} overflow="hidden">
              <Link href={result.showImage} target="_blank">
                <Text
                  fontWeight="semibold"
                  width="full"
                  isTruncated
                  color="alph"
                >
                  {result.item.name}
                </Text>
              </Link>
              <Text
                color="gray.500"
                isTruncated
              >
                {showTitle}
              </Text>
              <Text></Text>
            </Stack>
          </Stack>
        </Box>
      );
    } else {
      return null;
    }
  };


  return (
    <Center>
      <Text>Hey, I’m Wilson Lim Setiawan. I grew up in Singapore and am currently a
        junior studying Computer Science at the <a href="https://www.youtube.com/watch?v=vPCLIFs6KwI"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}> University of Southern California</a>.</Text>
      <Text>Elsewhere:   <a href="https://github.com/WilsonLimSet"
        target="_blank" style={{
          color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
          fontWeight: 'bold'
        }}> WilsonLimSet</a> on GitHub, my full name on <a href="https://www.linkedin.com/in/wilsonlimsetiawan/"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}>LinkedIn</a>, wilsonlimsetiawan@gmail.com on email, and my <a href="https://drive.google.com/file/d/1vNG7Ba7vHq4jhrbVRgy3I1IyPWIIlfqW/view?usp=sharing"
            target="_blank" style={{
              color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
              fontWeight: 'bold'
            }}> resume</a>.</Text>
      <br />
      <Text>Things I'm involved with and areas of interest: </Text>

      <ul style={{ paddingLeft: '60px' }}>
        <li><span style={{ fontWeight: 'bold' }}>Youtube.</span> Creating <a href="https://www.youtube.com/channel/UCH59qgZdA_fA5lTlmiQzNBQ"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}> content</a> that makes me content.</li>
        <li><span style={{ fontWeight: 'bold' }}>Developing.</span> Staying in <a href="https://chrome.google.com/webstore/detail/atomic-flow/gbeiphffnlkmgoclacceflphonplpigi"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}> Flow</a> and <a href="https://www.coffeechatai.com/"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}> Coffee Chatting</a>
          .</li>
        <li><span style={{ fontWeight: 'bold' }}>Podcasting.</span> Learning from others to get <a href="https://open.spotify.com/show/7jDxgVTztsskpDLGuyORNJ?si=f6eaf639f0894aed"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}> 1% better</a>.</li>
        <li><span style={{ fontWeight: 'bold' }}>Culture.</span> Maintaining my <a href="https://usc-ssa.github.io/Singapore-Student-Association/"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}>Singaporean</a> and <a href="https://www.instagram.com/uscasis/?hl=en"
            target="_blank" style={{
              color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
              fontWeight: 'bold'
            }}>Indonesian</a> roots.</li>

        <li><span style={{ fontWeight: 'bold' }}>Hiking.</span> <a href="https://www.peaksandprofessors.org/"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}>Think Outside</a>.</li>
        <li><span style={{ fontWeight: 'bold' }}>Books.</span> I am currently reading <a href="https://www.goodreads.com/book/show/44436221-interior-chinatown"
          target="_blank" style={{
            color: 'blue', fontStyle: 'italic', textDecoration: 'underline',
            fontWeight: 'bold'
          }}>Interior Chinatown</a>.
          <br />
          These have had the greatest impact on my worldview.</li>
        <BooksGrid />
      </ul>

      <br />
      <Box width="xs">
      {
        loading ? (
          <Stack align="center" mb={8}>
            <Spinner size="md" speed="0.6s" thickness={3} color="gray.500" />
          </Stack>
        ) : (
          <Stack width="full" mb={result.isPlaying ? 2 : 4} spacing={3}>
            <Stack spacing={2} direction="row" align="center">
              <SpotifyLogo />
              <Text fontWeight="semibold">
                {result.isPlaying ? 'Now Playing' : "Not Currently Playing"}
              </Text>
              {result.isPlaying && <PlayingAnimation />}
            </Stack>
            { renderNowPlayingItem()}
            <Stack spacing={2} direction="row" align="center">
              <OuraRingLogo />
              <Text fontWeight="semibold">
                {sleepDate
                  ? `${sleepDate} ${sleepDataText || 'Sleep Score Error'}`
                  : 'Date Error'}
              </Text>
            </Stack>
          </Stack>
        )
                }
            </Box>
            </Center>

            )
            };


       

export default SpotifyNowPlaying;

const Center = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;