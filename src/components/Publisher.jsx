import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import './publisher.css'

import Playlist from './Playlist/Playlist'
import VideoPlayer from './VideoPlayer'
import ChatBox from './ChatBox/ChatBox';

const Publisher = () => {
  const [playlist, updatePlaylist] = useState([])

  useEffect(() => {
    axios.get('http://10.10.213.235:8088/allSongs').then(res => {
      updatePlaylist(res.data)
    })
  }, [])

  return playlist.length ? (
    <div id='main_publisher'>
      <div id='two_column_container'>

        <div id='left_column'>
          <div id='left_column_profile_section'>
            <div id='profile_top_left_menu'></div>
            <div id='profile_empty_spacer'></div>
            <div id='profile_image'></div>
            <p id='profile_title'>Profile</p>
          </div>

          <div id='profile_section_divider'></div>

          <Playlist songs={playlist} />
        </div>

        <div id='right_column'>

          <div id='right_column__row_flex__show_info_section'>

            <div id='video_player_container'>
              <VideoPlayer />
            </div>

            <div id='live_shows__column_flex'>
              <p id='live_shows__listeners_count'>726 listeners</p>
              <p id='live_shows__elasped_time'>3:24:48</p>
              <button id='live_shows__pinned_comments_button'>
                PINNED COMMENTS (12)
                </button>
              <div id='live_shows__bottom_spacer'></div>
            </div>


          </div>

          <div id='chatbox_container'>
            <ChatBox />
          </div>

        </div>
      </div>
    </div >

  ) : (
      'loading'
    )
}

export default Publisher
