import MyWichlist from "@/components/accountuser/mywichlist/mywichlist";

import Layout from "@/components/accountuser/layout";
import {AppDispatch, RootState, wrapper} from "@/store";
import {GetServerSidePropsContext} from "next";
const wichlist = () => {
  return (
      <Layout>
        <MyWichlist/>
      </Layout>
  );
};

export default wichlist;


export const getServerSideProsp: GetServerSideProps = wrapper.getServerSideProps((store: {
    dispatch: AppDispatch;
    getState: () => RootState
}) => async (context: GetServerSidePropsContext) => {



});