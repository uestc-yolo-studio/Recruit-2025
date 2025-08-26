import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart, Share2, Download, Calendar, Users, MapPin, Tag } from 'lucide-react';
import GradientBackground from '../components/GradientBackground';

const PhotoWall = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // 照片数据 - 使用content/images中的照片，添加详细描述
    const photoData = [
        {
            id: 1,
            src: '/content/images/0260C1E1-AE33-4609-9FF4-21B1239D7A32_1_105_c.jpeg',
            title: '工作室技术分享会',
            description: '团队成员一起讨论最新的技术趋势和项目进展',
            detailedDescription: '在这次技术分享会上，我们深入探讨了前端框架的发展趋势，分享了各自在项目中的经验和心得。大家积极交流，互相学习，展现了YOLO工作室浓厚的技术氛围。',
            date: '2024年3月',
            location: '工作室会议室',
            participants: ['张三', '李四', '王五', '赵六'],
            tags: ['技术分享', '团队建设', '学习交流'],
            category: '技术活动'
        },
        {
            id: 2,
            src: '/content/images/106DBC37-9134-42E4-9A1F-3E15A537921A_1_105_c.jpeg',
            title: '项目展示日',
            description: '展示我们最新的项目成果和技术创新',
            detailedDescription: '项目展示日是工作室的重要活动，每个团队都展示了他们的最新成果。从移动应用到Web平台，从AI算法到数据分析，展现了我们多元化的技术实力。',
            date: '2024年2月',
            location: '学校报告厅',
            participants: ['全体成员'],
            tags: ['项目展示', '技术创新', '成果汇报'],
            category: '项目展示'
        },
        {
            id: 3,
            src: '/content/images/17DEB6CD-2499-4E37-9A92-88A8F3611863_1_105_c.jpeg',
            title: '团队建设活动',
            description: '增进团队友谊，提升团队凝聚力的户外活动',
            detailedDescription: '这次团队建设活动让我们在轻松愉快的氛围中增进了彼此的了解。通过团队游戏和户外活动，我们不仅放松了身心，更重要的是加强了团队协作精神。',
            date: '2024年1月',
            location: '郊外公园',
            participants: ['全体成员'],
            tags: ['团队建设', '户外活动', '友谊增进'],
            category: '团队活动'
        },
        {
            id: 4,
            src: '/content/images/5ECADC18-1447-4B21-80FE-539DA1E04CDF_1_105_c.jpeg',
            title: '创新项目研讨会',
            description: '探讨创新项目的发展方向和实施策略',
            detailedDescription: '在创新项目研讨会上，我们深入分析了当前的技术发展趋势，讨论了如何将创新理念转化为实际项目。这次会议为我们的未来发展指明了方向。',
            date: '2024年4月',
            location: '工作室',
            participants: ['核心成员'],
            tags: ['创新研讨', '项目规划', '技术发展'],
            category: '技术活动'
        },
        {
            id: 5,
            src: '/content/images/66FFF7DC-E313-41AB-A6F1-41A6D402795C.jpeg',
            title: '学习交流日',
            description: '互相学习，共同进步的技术交流活动',
            detailedDescription: '学习交流日是我们定期举办的活动，每个人都可以分享自己最近学习的新技术或解决的技术难题。这种开放的学习氛围让每个人都受益匪浅。',
            date: '2024年3月',
            location: '工作室',
            participants: ['全体成员'],
            tags: ['学习交流', '技术分享', '知识传递'],
            category: '学习活动'
        },
        {
            id: 6,
            src: '/content/images/69761B93-9B5B-4196-A5DE-2F47D7965B83.jpeg',
            title: '创新思维工作坊',
            description: '激发创新灵感，培养创新思维的工作坊',
            detailedDescription: '创新思维工作坊通过一系列创意练习和头脑风暴活动，帮助我们突破思维定式，激发创新灵感。这次活动让我们学会了从不同角度思考问题。',
            date: '2024年2月',
            location: '创意空间',
            participants: ['新成员', '导师'],
            tags: ['创新思维', '头脑风暴', '创意练习'],
            category: '学习活动'
        },
        {
            id: 7,
            src: '/content/images/85FC4E4F-08A8-4FBF-82DF-C0F3C171D87B.jpeg',
            title: '团队协作项目',
            description: '齐心协力完成重要项目的团队协作场景',
            detailedDescription: '在这个重要的团队协作项目中，每个人都发挥了自己的专长，通过有效的沟通和协作，我们成功完成了项目目标。这次经历让我们深刻体会到了团队合作的重要性。',
            date: '2024年1月',
            location: '项目现场',
            participants: ['项目团队'],
            tags: ['团队协作', '项目管理', '目标达成'],
            category: '项目展示'
        },
        {
            id: 8,
            src: '/content/images/A193A592-E0CB-417E-9854-B683643533A6_1_105_c.jpeg',
            title: '技术深度研讨',
            description: '深入探讨技术问题，寻求最佳解决方案',
            detailedDescription: '技术深度研讨是我们解决复杂技术问题的关键环节。通过深入的讨论和分析，我们不仅找到了问题的根源，还探索出了多种解决方案。',
            date: '2024年4月',
            location: '技术会议室',
            participants: ['技术专家', '核心成员'],
            tags: ['技术研讨', '问题解决', '深度分析'],
            category: '技术活动'
        },
        {
            id: 9,
            src: '/content/images/C30E870A-0C56-40F5-BF87-F2FA1C946FCD_1_105_c.jpeg',
            title: '成果展示会',
            description: '展示我们的工作成果和技术创新',
            detailedDescription: '成果展示会是我们向外界展示工作室实力和技术成果的重要平台。通过精心准备的展示，我们向观众展示了我们的技术实力和创新能力。',
            date: '2024年3月',
            location: '展示大厅',
            participants: ['展示团队', '观众'],
            tags: ['成果展示', '技术创新', '实力展示'],
            category: '项目展示'
        },
        {
            id: 10,
            src: '/content/images/DD893315-9793-4AB2-B6D5-FD966E3481B2_1_105_c.jpeg',
            title: '团队合影留念',
            description: '记录美好时光，珍藏团队回忆',
            detailedDescription: '这张合影记录了我们在一个重要项目完成后的喜悦时刻。每个人的笑容都洋溢着成就感，这是我们团队共同努力的见证，也是我们友谊的珍贵回忆。',
            date: '2024年2月',
            location: '工作室门口',
            participants: ['全体成员'],
            tags: ['团队合影', '美好回忆', '友谊见证'],
            category: '团队活动'
        }
    ];

    useEffect(() => {
        // 模拟加载延迟
        const timer = setTimeout(() => {
            setPhotos(photoData);
            setLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const openPhoto = (photo, index) => {
        setSelectedPhoto(photo);
        setCurrentIndex(index);
    };

    const closePhoto = () => {
        setSelectedPhoto(null);
    };

    const nextPhoto = () => {
        const nextIndex = (currentIndex + 1) % photos.length;
        setCurrentIndex(nextIndex);
        setSelectedPhoto(photos[nextIndex]);
    };

    const prevPhoto = () => {
        const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        setSelectedPhoto(photos[prevIndex]);
    };

    const filteredPhotos = filter === 'all' ? photos : photos.filter(photo => photo.category === filter);

    const categories = [
        { id: 'all', name: '全部' },
        { id: '技术活动', name: '技术活动' },
        { id: '项目展示', name: '项目展示' },
        { id: '团队活动', name: '团队活动' },
        { id: '学习活动', name: '学习活动' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 100
            }
        }
    };

    if (loading) {
        return (
            <GradientBackground>
                <div className="min-h-screen flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-[#0c7eb4] border-t-transparent rounded-full"
                    />
                </div>
            </GradientBackground>
        );
    }

    return (
        <GradientBackground>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 页面标题 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center mb-8"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-bold text-[hsl(var(--text-primary))] mb-2"
                    >
                        照片墙
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                        className="mx-auto mb-4 h-1 w-24 origin-left rounded-full bg-[#0c7eb4]"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                        className="text-xl text-[hsl(var(--text-secondary))] max-w-2xl mx-auto mb-6"
                    >
                        记录YOLO工作室的精彩瞬间，见证我们的成长与欢笑
                    </motion.p>

                    {/* 分类筛选 */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-2 mb-8"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setFilter(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === category.id
                                        ? 'bg-[#0c7eb4] text-white shadow-lg'
                                        : 'bg-white/20 text-[hsl(var(--text-primary))] hover:bg-white/30'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </motion.div>
                </motion.div>

                {/* 照片网格 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
                >
                    {filteredPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            variants={itemVariants}
                            className="break-inside-avoid mb-4 group cursor-pointer"
                            onClick={() => openPhoto(photo, index)}
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                                        <p className="text-sm opacity-90 mb-2">{photo.description}</p>
                                        <div className="flex items-center gap-2 text-xs opacity-75">
                                            <Calendar className="w-3 h-3" />
                                            {photo.date}
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {photo.tags.slice(0, 2).map((tag, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 照片查看器 */}
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={closePhoto}
                    >
                        <div className="relative max-w-5xl max-h-full overflow-y-auto">
                            {/* 关闭按钮 */}
                            <button
                                onClick={closePhoto}
                                className="absolute top-4 right-4 z-10 text-white hover:text-[#80ef1e] transition-colors"
                            >
                                <X size={32} />
                            </button>

                            {/* 导航按钮 */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevPhoto();
                                }}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#80ef1e] transition-colors z-10"
                            >
                                <ChevronLeft size={40} />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextPhoto();
                                }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#80ef1e] transition-colors z-10"
                            >
                                <ChevronRight size={40} />
                            </button>

                            {/* 照片内容 */}
                            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6">
                                <img
                                    src={selectedPhoto.src}
                                    alt={selectedPhoto.title}
                                    className="max-w-full max-h-[60vh] object-contain rounded-lg mb-6"
                                />

                                {/* 照片详细信息 */}
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedPhoto.title}</h3>
                                        <p className="text-lg text-gray-600 mb-4">{selectedPhoto.description}</p>
                                    </div>

                                    {/* 详细信息 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#0c7eb4]" />
                                            <span className="text-gray-700">时间：{selectedPhoto.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-[#0c7eb4]" />
                                            <span className="text-gray-700">地点：{selectedPhoto.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-[#0c7eb4]" />
                                            <span className="text-gray-700">参与人员：{selectedPhoto.participants.join('、')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-[#0c7eb4]" />
                                            <span className="text-gray-700">分类：{selectedPhoto.category}</span>
                                        </div>
                                    </div>

                                    {/* 详细描述 */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-800 mb-2">活动详情</h4>
                                        <p className="text-gray-700 leading-relaxed">{selectedPhoto.detailedDescription}</p>
                                    </div>

                                    {/* 标签 */}
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPhoto.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-[#0c7eb4] text-white rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="flex justify-center gap-4 pt-4 border-t">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-[#0c7eb4] hover:bg-[#6da4aa] text-white rounded-lg transition-colors">
                                            <Heart size={16} />
                                            喜欢
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-[#e1aa70] hover:bg-[#e99a28] text-white rounded-lg transition-colors">
                                            <Share2 size={16} />
                                            分享
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-[#a3d4d1] hover:bg-[#6da4aa] text-white rounded-lg transition-colors">
                                            <Download size={16} />
                                            下载
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </GradientBackground>
    );
};

export default PhotoWall;
