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
        // 新增的24级新同学见面会照片
        {
            id: 11,
            src: '/content/images/24-dinner-1.png',
            title: '24级新同学见面会 - 初次相聚',
            description: '欢迎24级新同学加入YOLO工作室大家庭',
            detailedDescription: '这是我们为24级新同学举办的第一次见面会，大家围坐在一起，分享着对技术的热情和对未来的憧憬。新同学们带着好奇和期待的眼神，老成员们则热情地分享着工作室的故事和经验。这次见面会不仅让新同学们快速融入了团队，也为后续的合作奠定了良好的基础。',
            date: '2024年11月',
            location: '天食小馆',
            participants: ['24级新同学', '老成员', '指导老师'],
            tags: ['新同学见面', '团队融入', '友谊建立'],
            category: '团队活动'
        },
        {
            id: 12,
            src: '/content/images/24-dinner-2.png',
            title: '24级新同学见面会 - 技术交流',
            description: '新老成员进行深入的技术交流和经验分享',
            detailedDescription: '在这次见面会上，我们特别安排了技术交流环节。老成员们分享了他们在项目开发中的经验和教训，新同学们也提出了自己对技术的理解和疑问。这种面对面的交流让知识传递更加直接有效，也让新同学们对工作室的技术氛围有了更深的认识。',
            date: '2024年11月',
            location: '天食小馆',
            participants: ['24级新同学', '技术骨干', '项目负责人'],
            tags: ['技术交流', '经验分享', '知识传递'],
            category: '技术活动'
        },
        {
            id: 13,
            src: '/content/images/24-dinner-3.png',
            title: '24级新同学见面会 - 团队合影',
            description: '记录新老成员首次相聚的美好时刻',
            detailedDescription: '这张合影记录了24级新同学加入后的第一次团队聚会。每个人的脸上都洋溢着笑容，新同学们虽然还有些腼腆，但已经感受到了团队的温暖。这次合影不仅是一个美好的回忆，更是新老成员友谊开始的见证。',
            date: '2024年11月',
            location: '天食小馆',
            participants: ['全体24级新同学', '老成员代表', '指导老师'],
            tags: ['团队合影', '新成员欢迎', '友谊见证'],
            category: '团队活动'
        },
        {
            id: 14,
            src: '/content/images/24-dinner-4.png',
            title: '24级新同学见面会 - 项目介绍',
            description: '向新同学介绍工作室的经典项目和未来规划',
            detailedDescription: '在这次见面会上，我们向新同学们详细介绍了工作室的经典项目，包括智能校园导航系统、在线教育平台等。通过项目介绍，新同学们不仅了解了工作室的技术实力，也对未来的发展方向有了清晰的认识。',
            date: '2024年11月',
            location: '天食小馆',
            participants: ['24级新同学', '项目负责人', '技术导师'],
            tags: ['项目介绍', '技术展示', '发展规划'],
            category: '项目展示'
        },
        {
            id: 15,
            src: '/content/images/24-dinner-5.png',
            title: '24级新同学见面会 - 轻松交流',
            description: '在轻松愉快的氛围中增进彼此了解',
            detailedDescription: '见面会的最后环节是轻松的自由交流时间。大家围坐在一起，分享着各自的兴趣爱好、学习经历和对技术的理解。这种轻松的氛围让新同学们放下了紧张，真正融入了团队。',
            date: '2024年11月',
            location: '天食小馆',
            participants: ['24级新同学', '老成员', '指导老师'],
            tags: ['轻松交流', '友谊建立', '团队融入'],
            category: '团队活动'
        },
        
        // 24年招新宣讲会照片
        {
            id: 17,
            src: '/content/images/24-recruit-speech.png',
            title: '24年招新宣讲会 - 展示工作室魅力',
            description: '向全校同学展示YOLO工作室的技术实力和发展前景',
            detailedDescription: '这是2024年的招新宣讲会，我们向全校同学展示了YOLO工作室的技术实力、项目成果和发展前景。通过精彩的演讲和项目演示，我们吸引了众多对技术充满热情的同学。这次宣讲会不仅展示了我们的实力，也为工作室注入了新的活力。',
            date: '2024年10月',
            location: '二教',
            participants: ['宣讲团队', '全校同学', '指导老师'],
            tags: ['招新宣讲', '技术展示', '人才吸引'],
            category: '技术活动'
        },
       
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
