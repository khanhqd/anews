package com.news;

import android.app.Application;
import com.reactnativenavigation.NavigationApplication;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.toast.RCTToastPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
   public boolean isDebug() {
       // Make sure you are using BuildConfig from your own application
       return BuildConfig.DEBUG;
   }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add additional packages you require here
   return Arrays.<ReactPackage>asList(
       new RCTToastPackage()
   );
  };

}
