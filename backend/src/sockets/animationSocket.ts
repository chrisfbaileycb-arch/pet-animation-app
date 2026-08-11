import { Server, Socket } from 'socket.io';
import { logger } from '../utils/logger';

export const setupAnimationSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    logger.info(`Socket client connected: ${socket.id}`);

    socket.on('join_pet_room', (petId: string) => {
      socket.join(`pet:${petId}`);
      logger.info(`Socket ${socket.id} joined room pet:${petId}`);
    });

    socket.on('live_keyframe_update', (data: { petId: string; keyframe: any }) => {
      socket.to(`pet:${data.petId}`).emit('keyframe_synced', data.keyframe);
    });

    socket.on('disconnect', () => {
      logger.info(`Socket client disconnected: ${socket.id}`);
    });
  });
};
