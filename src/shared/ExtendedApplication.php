<?php

namespace Shared;

use \Illuminate\Foundation\Application;

class ExtendedApplication extends Application {

  /**
   * The base path for the Laravel installation.
   *
   * @var string
   */
  protected $sourcePath;

  /**
   * Set the base path for the application.
   *
   * @param  string  $basePath
   * @return $this
   */
  public function setBasePath($basePath){

    $this->basePath = rtrim($basePath, '\/');
    $this->sourcePath = rtrim($basePath.'/src', '\/');
    $this->bindPathsInContainer();

    return $this;
  }

  /**
   * Get the path to the application "app" directory.
   *
   * @param  string  $path
   * @return string
   */
  public function path($path = ''){

    $appPath = $this->appPath ?: $this->sourcePath.DIRECTORY_SEPARATOR.'modules';
    return $appPath.($path ? DIRECTORY_SEPARATOR.$path : $path);
  }

  /**
   * Get the base path of the Laravel installation.
   *
   * @param  string  $path
   * @return string
   */
  public function basePath($path = ''){

    return $this->basePath.($path ? DIRECTORY_SEPARATOR.$path : $path);
  }

  /**
   * Get the src folder path of the Laravel installation.
   *
   * @param  string  $path
   * @return string
   */
  public function sourcePath($path = ''){

    return $this->sourcePath.($path ? DIRECTORY_SEPARATOR.$path : $path);
  }

  /**
   * Get the path to the bootstrap directory.
   *
   * @param  string  $path
   * @return string
   */
  public function bootstrapPath($path = ''){

    return $this->sourcePath.($path ? DIRECTORY_SEPARATOR.$path : $path);
  }

  /**
   * Get the path to the application configuration files.
   *
   * @param  string  $path
   * @return string
   */
  public function configPath($path = ''){

    return $this->sourcePath.DIRECTORY_SEPARATOR.'config'.($path ? DIRECTORY_SEPARATOR.$path : $path);
  }

  /**
   * Get the path to the database directory.
   *
   * @param  string  $path
   * @return string
   */
  public function databasePath($path = ''){

    return ($this->databasePath ?: $this->sourcePath.DIRECTORY_SEPARATOR.'shared/Services/Database').($path ? DIRECTORY_SEPARATOR.$path : $path);
  }

  /**
   * Get the path to the storage directory.
   *
   * @return string
   */
  public function storagePath(){

    return $this->storagePath ?: $this->sourcePath.DIRECTORY_SEPARATOR.'storage';
  }

  /**
   * Get the path to the resources directory.
   *
   * @param  string  $path
   * @return string
   */
  public function resourcePath($path = ''){

    return $this->sourcePath.DIRECTORY_SEPARATOR.'resources'.($path ? DIRECTORY_SEPARATOR.$path : $path);
  }

  /**
   * Get the path to the language files.
   *
   * @return string
   */
  public function langPath(){

    if($this->langPath) return $this->langPath;
    if(is_dir($path = $this->resourcePath().DIRECTORY_SEPARATOR.'lang')) return $path;
    return $this->sourcePath.DIRECTORY_SEPARATOR.'lang';
  }

  /**
   * Get the path to the public / web directory.
   *
   * @return string
   */
  public function publicPath(){

    return $this->sourcePath.DIRECTORY_SEPARATOR.'public';
  }

  /**
   * Get the path to the views directory.
   *
   * This method returns the first configured path in the array of view paths.
   *
   * @param  string  $path
   * @return string
   */
  public function viewPath($path = ''){

    $basePath = $this['config']->get('view.paths')[0];
    return rtrim($basePath, DIRECTORY_SEPARATOR).($path ? DIRECTORY_SEPARATOR.$path : $path);
  }
}
