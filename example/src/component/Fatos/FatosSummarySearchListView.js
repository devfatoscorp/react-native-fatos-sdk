import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    FlatList, NativeModules,
    NativeEventEmitter,
} from 'react-native'

import COMMON from '../common/common';
import FatosUIManager from '../Manager/FatosUIManager';

export default class FatosSummarySearchListView extends React.Component {

    state = {
        loading: false,
        totalCount : '',
        count : '',
        page: 1,
        data: [],
        seed: 1,
        error: null,
        refreshing: false,
        isStart: false,
        isGoal: false,
        startData : null,
        goalData : null,
        visible : false,
    };

    constructor(props) {
        super(props);
        this.native = NativeModules.FatosNaviBridgeModule;
    }

    setStartFlag(blnStart)
    {
        this.state.isStart = blnStart;
        this.state.isGoal = !blnStart;
    }

    setStartData(data)
    {
        this.setState( {startData : data} );
    }

    getStartData()
    {
        return this.state.startData;
    }

    setGoalFlag(blnGoal)
    {
        this.state.isStart = !blnGoal;
        this.state.isGoal = blnGoal;
    }

    setGoalData(data)
    {
        this.setState( {goalData : data} );
    }

    getGoalData()
    {
        return this.state.goalData;
    }

    OnChangeStartGoal()
    {
        if(this.state.startData !== null && this.state.goalData !== null)
        {
            var startData = this.state.startData;
            var goalData = this.state.goalData;

            this.state.startData = goalData;
            this.state.goalData = startData;
        }

        this.Route();
    }

    setSearchData(searchData)
    {
        if(!searchData || 0 == searchData.length)
            return;

        var node = JSON.parse(searchData);

        if(node)
        {
            // 기존에 있던 데이터를 지운다
            this.clearSearchData();

            var pgno = node.pgno;
            var cnt = node.cnt;
            var data = [];
            var items = node.items;

            if(items)
            {
                for (var i = 0; i < items.length; ++i)
                {
                    var id = items[i].id;
                    var name = items[i].name;
                    var addr1 = items[i].addr1;
                    var addr2 = items[i].addr2;
                    var phone = items[i].phone;
                    var cate = items[i].cate;
                    var posx = items[i].posx;
                    var posy = items[i].posy;
                    var entx = items[i].entx;
                    var enty = items[i].enty;
                    var dist = items[i].dist;

                    data.push({
                        id: id,
                        name: name,
                        fullAddName: addr2,
                        key: i,
                        frontLat: posy.toString(),
                        frontLon : posx.toString(),
                    });
                }

            }

            this.setState({
                totalCount: 0,
                count: 0,
                page: pgno,
                data: data,
            });
        }
    }

    clearSearchData()
    {
        while (this.state.data.length)
        {
            this.state.data.pop();
        }

        this.setState({data : []});
    }

    setRouteData(item)
    {
        if(this.state.isStart === true)
        {
            this.state.startData = item;
        }

        if(this.state.isGoal === true)
        {
            this.state.goalData = item;
        }

        this.Route();
    }

    Route()
    {
        if(this.state.startData === null && this.state.goalData !== null)
        {
            this.native.Route('0', '0', this.state.goalData.frontLat, this.state.goalData.frontLon);
            this.clearSearchData();

        }
        else if(this.state.startData !== null && this.state.goalData !== null)
        {
            this.native.Route(this.state.startData.frontLat, this.state.startData.frontLon,
                this.state.goalData.frontLat, this.state.goalData.frontLon);
            this.clearSearchData();
        }
    }

    update()
    {
        this.setVisible(FatosUIManager.GetInstance().isSummaryViewVisible());
    }

    setVisible(val)
    {
        if(val !== this.state.visible)
        {
            this.setState({visible : val});
        }
    }

    render () {

        if(this.state.visible === false)
            return null;

        if(this.state.data.length === 0)
            return null;

        return <View style={styles.container} >
            <View style={styles.listContainer} >
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={() => { this.setRouteData(item) }}>
                            <View style={styles.flatview}>
                                <Text style={styles.name} numberOfLines = { 1 } >{item.name}</Text>
                                <Text style={styles.address} numberOfLines = { 1 } >
                                    {item.fullAddName}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    keyExtractor={item => item.key.toString()}
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection : 'column',
        position: 'absolute',
        width : '100%',
        height : '100%',
        top : 130,
        paddingBottom : 290,
    },

    listContainer :{
        flex: 1,
        marginLeft : 10,
        marginRight : 10,
    },

    flatview: {
        justifyContent: 'center',
        flex: 1,
        width : '100%',
        height : 60,
        marginBottom: 5, // 셀 여백 값
        backgroundColor : 'rgba(255, 255, 255, 0.9)',
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        borderBottomLeftRadius : 5,
        borderBottomRightRadius : 5,
        borderColor : "gray",
        borderWidth : 1,
        padding : 5
    },
    name: {
        color: 'black',
        fontSize: 18,
        marginBottom: 3,
    },
    address: {
        color: 'brown',
        fontSize: 15,
    }


});
