import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import MobileNav from '@/components/MobileNav';

import useDialogStore from '@/store/useDialogStore';

import { Footer } from './Footer';
import { Header } from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  //#region  //*=========== STORE ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== STORE ===========

  return (
    <>
      <MobileNav />

    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container flex-grow max-w-screen-lg px-5 m-auto mt-16 sm:px-12 md:px-20">
          {children}
        </main>
        <Footer />
        <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
      </div>
      </>
    
  );
}
