import {ScaledSheet} from 'react-native-size-matters';
import {normalize} from '../../Common/Normalize';
import {Colors} from '../../Common/Colours';

export default ScaledSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  listCommonview: {
    flex: 1,
    width: '100%',
  },
  tabtextColor: {
    fontSize: normalize(14),
    color: Colors.lightpink,
  },
  style1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  style2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style3: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
  },
  style4: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.lightpink,
  },

  // renderHome
  style5: {
    flexDirection: 'row',
    borderBottomWidth: normalize(1),
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: normalize(5),
  },
  style6: {
    flex: 0.2,
    height: '100%',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(16),
  },
  style7: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(100),
  },
  style8: {
    justifyContent: 'center',
    flex: 1,
  },
  style9: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  style10: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: Colors.black,
  },
  style11: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
    marginTop: normalize(5),
  },
  style12: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.lightpink,
  },
  style13: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: Colors.lightBlack,
  },
  style14: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: Colors.lightBlack,
  },

  // renderfavitems
  style15: {
    flexDirection: 'row',
    borderBottomWidth: normalize(1),
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  style16: {
    flex: 0.2,
    height: '100%',
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(16),
  },
  style17: {
    flex: 0.7,
    justifyContent: 'center',
  },
  style18: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  style19: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style20: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.lightpink,
  },

  footer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(15),
    marginBottom: normalize(40),
  },
});
