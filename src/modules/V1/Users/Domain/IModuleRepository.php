<?php

namespace Modules\V1\Users\Domain;

use Shared\Interfaces\IRepository;

interface IModuleRepository extends IRepository {

  /**
   * Get all records from a sub model and it total.
   * @param array $where
   * @param string $subName
   * @param array $options
   * @return array
   */
  public static function getSubAll($where, $subName, $options);

  /**
   * Get one sub model record.
   * @param array $where
   * @param array $sub
   * @param array $options
   * @return Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model
   */
  public static function getSubBy($where, $sub, $options);

  /**
   * Create one or more sub model records.
   * @param array $where
   * @param array $subName
   * @param array $data
   * @return Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model|Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model[]
   */
  public static function createSub($where, $subName, $data);

  /**
   * Update one or more sub model records.
   * @param array $where
   * @param array $sub
   * @param array $toUpdate
   * @param array $options
   * @return Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model
   */
  public static function updateSub($where, $sub, $toUpdate, $options);

  /**
   * Delete one or more sub model records.
   * @param array $where
   * @param array $sub
   * @param array $options
   * @return Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model
   */
  public static function deleteSub($where, $sub, $options);
}
