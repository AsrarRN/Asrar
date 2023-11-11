import {ScaledSheet} from 'react-native-size-matters';
import {normalize} from '../../Common/Normalize';
import {Colors} from '../../Common/Colours';
import {Platform} from 'react-native';

export default ScaledSheet.create({
  safeAreStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    padding: normalize(20),
    justifyContent: 'center',
  },
  backgroundView: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: normalize(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: normalize(5),
    backgroundColor: Colors.white,
    alignItems: 'center',
    height: '90%',
    borderRadius: normalize(5),
  },
  style1: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
    backgroundColor: Colors.lightwhite,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: normalize(2),
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: normalize(5),
    bottom: normalize(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  style2: {
    height: normalize(45),
    width: normalize(45),
  },
  style3: {
    fontSize: normalize(22),
    color: Colors.black,
    fontWeight: 'bold',
    marginTop: normalize(30),
  },
  style4: {
    marginTop: normalize(50),
  },
  style5: {
    flexDirection: 'row',
    alignItems: 'center',
    width: normalize(300),
    borderBottomWidth: 1,
  },
  style6: {
    height: normalize(18),
    width: normalize(18),
    marginTop: Platform.OS === 'android' ? normalize(5) : -normalize(5),
  },
  style7: {
    color: Colors.black,
    paddingBottom: normalize(5),
    fontSize: normalize(12),
    paddingLeft: normalize(10),
    flex: 1,
    height: normalize(40),
  },
  style8: {
    flexDirection: 'row',
    alignItems: 'center',
    width: normalize(300),
    borderBottomWidth: 1,
    marginTop: normalize(15),
  },
  style9: {
    height: normalize(20),
    width: normalize(20),
  },
  style10: {
    color: Colors.black,
    paddingBottom: normalize(5),
    fontSize: normalize(12),
    paddingLeft: normalize(10),
    width: normalize(300),
  },
  style11: {
    marginTop: normalize(80),
    height: normalize(45),
    width: normalize(300),
    alignItems: 'center',
    justifyContent: 'center',
  },
  style12: {
    color: Colors.white,
    fontSize: normalize(13),
    fontWeight: 'bold',
  },
});
