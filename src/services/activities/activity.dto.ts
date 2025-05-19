import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDate,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export enum ActivityType {
  LOGIN = "login",
  GAME_PLAY = "game_play",
  TASK_COMPLETE = "task_complete",
  MISSION_COMPLETE = "mission_complete",
  REWARD_CLAIM = "reward_claim",
  SPIN = "spin",
  RAFFLE = "raffle",
}

export class ActivityMetadataDto {
  @IsString()
  @IsOptional()
  gameId?: string;

  @IsString()
  @IsOptional()
  taskId?: string;

  @IsString()
  @IsOptional()
  missionId?: string;

  @IsNumber()
  @IsOptional()
  rewardAmount?: number;

  @IsString()
  @IsOptional()
  rewardType?: string;
}

export class UserActivityDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(ActivityType)
  @IsNotEmpty()
  activityType: ActivityType;

  @IsDate()
  @IsNotEmpty()
  timestamp: Date;

  @ValidateNested()
  @Type(() => ActivityMetadataDto)
  @IsOptional()
  metadata?: ActivityMetadataDto;
}
