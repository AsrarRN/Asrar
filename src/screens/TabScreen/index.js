import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  LogBox,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from '../../Common/Normalize';
import {
  HomeBlack,
  HomeUnfilled,
  starBlack,
  starUnfilled,
} from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {GetHomeDetails} from '../../store/actions/HomeActions';
import {HOME_DETAILS} from '../../store/types';
import {Colors} from '../../Common/Colours';
import styles from './styles';

// Page size
const PAGE_SIZE = 1;

//In the APi response the total number of records has not been added so i took 100 as max.
const total = 101;

export default function TabScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [HomeData, setHomeData] = useState([]);
  const {CommonReducer} = useSelector(state => ({
    CommonReducer: state.CommonReducer,
  }));
  const {HomeReducer} = useSelector(state => ({
    HomeReducer: state.HomeReducer,
  }));

  const dispatch = useDispatch();
  const isFirstRun = useRef(true);

  // creating ref for not create api multiple time while reaced end.
  const callOnEndReached = useRef(false);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      // Calling first when the render screen
      initCall();
    } else {
      if (CommonReducer.api_type) {
        getResponse();
      }
    }
  }, [CommonReducer, HomeReducer]);

  const initCall = async () => {
    var body = PAGE_SIZE;
    dispatch(GetHomeDetails(body));
    setLoading(true);
  };

  function getResponse() {
    // if response have any errors
    if (HomeReducer.message && CommonReducer.api_type) {
      alert(HomeReducer?.message);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    //Response will show here
    switch (CommonReducer.api_type) {
      case HOME_DETAILS: {
        if (HomeReducer.resData != null) {
          var response = HomeReducer.resData;
          setLoading(false);
          setRefreshing(false);
          setPage(response.info.page);

          if (response) {
            let resData = response?.results;

            // default isselected false to every star value
            resData.map(e => (e.isSelected = false));

            if (response.info?.page !== 1) {
              let homeIds = HomeData.map(item => item.login?.uuid);
              resData = resData.filter(
                item => homeIds.indexOf(item.login?.uuid) == -1,
              );
              if (HomeData.length > 0) {
                setHomeData([...HomeData, ...resData]);
              } else {
                setHomeData([]);
              }
            } else {
              setHomeData(resData);
            }
          }
        }
        break;
      }

      default:
        break;
    }
  }

  const selectUnselecteItem = item => {
    item.isSelected = !item.isSelected;
    let data = [...HomeData];
    setHomeData(data);
  };

  const onRefreshing = () => {
    if (!loading && !refreshing) {
      setRefreshing(true);
      setLoading(false);
      var body = PAGE_SIZE;
      dispatch(GetHomeDetails(body));
    }
  };

  const _onEndReached = async updatedPage => {
    dispatch(GetHomeDetails(updatedPage));
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More
      HomeData.length < total ? (
        <View style={styles.footer}>
          <Text style={{fontSize: normalize(15), color: Colors.black}}>
            Loading...
          </Text>
        </View>
      ) : null
    );
  };

  const onEndReached = () => {
    if (HomeData.length < total && !loading && !refreshing) {
      let updatedPage = page + 1;
      setPage(updatedPage);
      _onEndReached(updatedPage);
    }
  };

  const _renderItemHome = useCallback(({item, index}) =>
    _renderItems({item, index}),
  );

  const _renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        activeOpacity={0.5}
        onPress={() => {
          selectUnselecteItem(item);
        }}
        style={styles.style5}>
        <View style={styles.style6}>
          <Image
            source={{uri: item?.picture?.thumbnail}}
            resizeMode="contain"
            style={styles.style7}
          />
        </View>
        <View style={styles.style8}>
          <View style={styles.style9}>
            <Text style={styles.style10}>
              {item?.name?.first + ' ' + item?.name?.last}
            </Text>

            <View style={styles.style11}>
              <Image
                source={item?.isSelected ? starUnfilled : starBlack}
                resizeMode="contain"
                style={styles.style12}
              />
            </View>
          </View>
          <Text style={styles.style13}>Gender : {item?.gender}</Text>
          <Text style={styles.style14}>Phone : {item?.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderItemfavroute = useCallback(({item, index}) =>
    _renderFavItem({item, index}),
  );

  const _renderFavItem = ({item, index}) => {
    return (
      item.isSelected && (
        <TouchableOpacity
          key={index.toString()}
          activeOpacity={0.5}
          onPress={() => {
            selectUnselecteItem(item);
          }}>
          <View style={styles.style15}>
            <View style={styles.style16}>
              <Image
                source={{uri: item?.picture?.thumbnail}}
                resizeMode="contain"
                style={styles.style7}
              />
            </View>
            <View style={styles.style17}>
              <Text style={styles.style18}>
                {item?.name?.first + ' ' + item?.name?.last}
              </Text>
            </View>
            <View style={styles.style19}>
              <Image
                source={starUnfilled}
                resizeMode="contain"
                style={styles.style20}
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {selectedTab === 1 ? (
        <View style={styles.listCommonview}>
          {HomeData && HomeData.some(e => e.isSelected === true) ? (
            <FlatList
              data={HomeData}
              keyExtractor={(_, index) => `FAV-${index}`}
              renderItem={_renderItemfavroute}
            />
          ) : (
            <View style={styles.style1}>
              <Text>No Favorites Found.</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.listCommonview}>
          {HomeData && HomeData.length > 0 && (
            <FlatList
              data={HomeData}
              keyExtractor={(_, index) => `HOME-${index}`}
              renderItem={_renderItemHome}
              onEndReachedThreshold={0.4}
              removeClippedSubviews
              onMomentumScrollBegin={() => {
                if (!callOnEndReached.current) {
                  callOnEndReached.current = true;
                }
              }}
              onMomentumScrollEnd={() => {
                if (callOnEndReached.current) {
                  callOnEndReached.current && onEndReached();
                  callOnEndReached.current = false;
                }
              }}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    onRefreshing();
                  }}
                />
              }
            />
          )}
          {loading && (
            <View style={styles.style2}>
              <ActivityIndicator size="large" color={Colors.lightpink} />
            </View>
          )}
        </View>
      )}
      <View style={styles.style3}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
          }}
          style={[
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
            selectedTab == 0
              ? {borderTopWidth: normalize(3), borderColor: Colors.lightpink}
              : {},
          ]}>
          <Image
            source={selectedTab == 0 ? HomeBlack : HomeUnfilled}
            resizeMode="contain"
            style={styles.style4}
          />
          <Text style={styles.tabtextColor}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            useCallback(() => {
              setSelectedTab(1);
            }, [HomeData])
          }
          style={[
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
            selectedTab == 1
              ? {borderTopWidth: normalize(3), borderColor: Colors.lightpink}
              : {},
          ]}>
          <Image
            source={selectedTab == 1 ? starUnfilled : starBlack}
            resizeMode="contain"
            style={styles.style4}
          />
          <Text style={styles.tabtextColor}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
