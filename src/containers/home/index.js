import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import emptyPlaylist from './img/empty.png'
import {ScaleLoader} from 'react-spinners'

import {togglePriority, toggleVote, loadList, loadingTrackList} from '../../actions/playlistActions'
import './styles/index.css'


class Playlist extends Component {

    loadPlaylist = () => {
        this.props.loadingTrackList()
        console.log('Loading...')
        setTimeout(() => {
            this.props.loadList()
        }, 2000)
    }

render(){
    const {toggleVote, togglePriority, items, loading} = this.props
    console.log('itemsRender', items)
    return(
        <div className="playlist">
            {items &&
            <div className="list">
                <ListTrack
                    dataFile={items}
                    togglePriority={(id) => togglePriority(id)}
                    toggleVote={(id) => toggleVote(id)}
                />
            </div>
            }
            {!items && !loading &&
                <div className="empty">
                    <img src={emptyPlaylist} alt="emptyPlaylist"/>
                    <div className="clickToLoad"><button onClick={() => this.loadPlaylist()}>Load Playlist</button></div>
                </div>
            }
            {!items && loading &&
            <div className="loading"><ScaleLoader loading={this.props.loading}/></div>
            }

        </div>
    )}

}

const ListTrack = ({dataFile, togglePriority, toggleVote, checkedState}) =>
    dataFile.map((data, i) =>
        <div key={data.id}>
            <div className="row-content">
                <div className="left-content">
                    <div className="profileImg">
                        <img className="profile-pic" src={data.adder.pictureUrl} alt={data.adder.pictureUrl} />
                    </div>
                    <div className="trackDetails">
                        <div className="trackImg">
                            <img className="cover-pic" src={data.pictureUrl} alt={data.name}/>
                        </div>
                        <div className="track-id">
                            <span className="name">{data.name}</span><br/>
                            <span className="artist">{data.artist}</span><br/>
                        </div>
                        <div>
                            <small className="adderName">ajouté par {data.adder.name}</small>
                        </div>
                    </div>
                </div>
                <div className='right-content'>
                    <div className={data.priority ? 'isPriority selected' : 'isPriority' } onClick={() => togglePriority(data.id)}>
                        <FontAwesome.FaAlignJustify />
                    </div>
                    <div className={data.votes.userVoted ? 'vote selected': 'vote'} onClick={() => toggleVote(data.id)}>
                        <span className="count">{data.votes.count}</span>
                        <FontAwesome.FaHeart /></div>
                </div>
                {data.priority &&
                <div className="priority"></div>
                }
            </div>
        </div>
    );

const mapStateToProps = (state) => ({
    items : state.playlistReducer.items,
    loading:state.playlistReducer.loading
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadingTrackList,
    loadList,
    togglePriority,
    toggleVote,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)
