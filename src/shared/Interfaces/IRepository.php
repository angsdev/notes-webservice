<?php

namespace Shared\Interfaces;

interface IRepository{

  /**
   * Get all records and it total.
   * @param array $options
   * @return Model[]
   */
  public static function getAll($options);

  /**
   * Get one record.
   * @param array $where
   * @param array $options
   * @return Model
   */
  public static function getBy($where, $options);

  /**
   * Create one or more records.
   * @param array $data
   * @return Model|Model[]
   */
  public static function create($data);

  /**
   * Update one or more records.
   * @param array $where
   * @param array $toUpdate
   * @param array $options
   * @return Model|Model[]
   */
  public static function update($where, $toUpdate, $options);

  /**
   * Delete one or more records.
   * @param array $where
   * @param array $options
   * @return Model|Model[]
   */
  public static function delete($where, $options);
}
