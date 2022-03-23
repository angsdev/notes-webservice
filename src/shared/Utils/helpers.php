<?php


if(!function_exists('source_path')){

  /**
   * Get the path to the folder src of the install.
   * @param  string  $path
   * @return string
   */
  function source_path($path = ''){

    return app()->sourcePath($path);
  }
}

if(!function_exists('orField')){

  /**
   * Generate an options pair array with same value.
   * @param  string  $path
   * @return string
   */
  function orField($fields, $id){

    $parsed = [];
    $fieldsArray = explode('|', $fields);
    foreach($fieldsArray as $field) $parsed[$field] = $id;
    return $parsed;
  }
}


?>
