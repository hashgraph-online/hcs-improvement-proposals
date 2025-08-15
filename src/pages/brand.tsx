import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { motion } from 'framer-motion';
import { FiDownload, FiCopy, FiCheck } from 'react-icons/fi';
import { FaPalette, FaFont, FaImage, FaCode } from 'react-icons/fa';
import Typography from '../components/ui/Typography';

const BrandPage: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = {
    primary: [
      { name: 'Dark Blue', hex: '#3f4174', rgb: 'rgb(63, 65, 116)' },
      { name: 'Blue', hex: '#5599fe', rgb: 'rgb(85, 153, 254)' },
    ],
    secondary: [
      { name: 'Purple', hex: '#a679f0', rgb: 'rgb(166, 121, 240)' },
      { name: 'Green', hex: '#48df7b', rgb: 'rgb(72, 223, 123)' },
    ],
  };

  const logos = [
    { 
      name: 'Logo Whole', 
      light: '/Logo_Whole.png',
      dark: '/Logo_Whole_Dark.png'
    },
    { 
      name: 'Logo Compact', 
      light: '/Logo_Whole_Compact.png',
      dark: '/Logo_Compact_Dark.png'
    },
    { 
      name: 'Logo Icon', 
      light: '/Logo_Icon.png',
      dark: '/Logo_Icon_Dark.png'
    },
  ];

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <Layout
      title='Brand Kit | Hashgraph Online'
      description='Official brand guidelines, colors, logos, and assets for Hashgraph Online'
    >
      <div className='min-h-screen bg-white dark:bg-gray-900'>
        {/* Hero Section */}
        <section className='relative py-8 lg:py-12 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-black dark:to-purple-950/30'>
          <div className='absolute inset-0 z-0'>
            <div className='absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#a679f0]/20 to-[#5599fe]/20 rounded-full blur-3xl' />
            <div className='absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-br from-[#5eef81]/20 to-[#48df7b]/20 rounded-full blur-3xl' />
          </div>

          <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-center max-w-3xl mx-auto'
            >
              <Typography
                variant='h1'
                className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'
              >
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#a679f0] via-[#5599fe] to-[#48df7b]'>
                  Brand Kit
                </span>
              </Typography>
              <Typography
                variant='body'
                className='text-sm text-gray-600 dark:text-gray-200 mb-2 max-w-xl mx-auto'
              >
                Official brand guidelines, colors, logos, and assets.<br/>
                Everything you need to represent Hashgraph Online consistently and professionally.
              </Typography>
              <motion.button
                onClick={() => copyToClipboard('reinventing:("the_internet")', 'slogan')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='text-[#5599fe] bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 px-4 py-2 rounded-lg mb-4 inline-block font-mono text-base transition-colors cursor-pointer border-none'
              >
                reinventing:("the_internet")
                {copiedColor === 'slogan' && (
                  <span className='ml-2 text-green-500'>✓</span>
                )}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className='py-12 '>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className='h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#a679f0]/20 to-[#5599fe]/20'
                >
                  <FaPalette className='text-xl text-[#5599fe]' />
                </motion.div>
                <Typography variant='h2' className='text-3xl mt-3' noDefaultSize>
                  Color Palette
                </Typography>
              </div>

              <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
                {Object.entries(colors).map(([category, categoryColors]) => (
                  <div key={category}>
                    <Typography variant='h3' className='text-lg mb-2 capitalize' noDefaultSize>
                      {category} Colors
                    </Typography>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      {categoryColors.map((color) => (
                        <motion.div
                          key={color.hex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * categoryColors.indexOf(color) }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className='bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300'
                        >
                          <div
                            className='h-20'
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className='p-3'>
                            <Typography variant='h4' className='text-base mb-1' noDefaultSize>
                              {color.name}
                            </Typography>
                            <div className='space-y-2'>
                              <motion.button
                                onClick={() => copyToClipboard(color.hex, color.name + '-hex')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='flex items-center justify-between w-full px-3 py-2 bg-gray-50/20 dark:bg-gray-600/20 backdrop-blur-sm rounded-lg hover:bg-gray-100/30 dark:hover:bg-gray-500/30 transition-all duration-200 border border-gray-200/20 dark:border-gray-500/15'
                              >
                                <code className='text-sm font-mono text-gray-700 dark:text-gray-200'>{color.hex}</code>
                                {copiedColor === color.name + '-hex' ? (
                                  <FiCheck className='text-green-500' />
                                ) : (
                                  <FiCopy className='text-gray-400' />
                                )}
                              </motion.button>
                              <motion.button
                                onClick={() => copyToClipboard(color.rgb, color.name + '-rgb')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='flex items-center justify-between w-full px-3 py-2 bg-gray-50/20 dark:bg-gray-600/20 backdrop-blur-sm rounded-lg hover:bg-gray-100/30 dark:hover:bg-gray-500/30 transition-all duration-200 border border-gray-200/20 dark:border-gray-500/15'
                              >
                                <code className='text-sm font-mono text-gray-700 dark:text-gray-200'>{color.rgb}</code>
                                {copiedColor === color.name + '-rgb' ? (
                                  <FiCheck className='text-green-500' />
                                ) : (
                                  <FiCopy className='text-gray-400' />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Typography Section */}
        <section className='py-10 '>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#5599fe]/20 to-[#48df7b]/20'>
                  <FaFont className='text-xl text-[#48df7b]' />
                </div>
                <Typography variant='h2' className='text-3xl mt-3' noDefaultSize>
                  Typography
                </Typography>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-white dark:bg-gray-800 rounded-xl p-4 '>
                  <Typography variant='h3' className='text-lg mb-2' noDefaultSize>
                    Primary Font
                  </Typography>
                  <div className='space-y-3'>
                    <div>
                      <Typography variant='h4' className='font-mono text-2xl mb-1' noDefaultSize>
                        Roboto Mono
                      </Typography>
                      <Typography variant='body' className='text-sm text-gray-600 dark:text-gray-300'>
                        Used for headings, code blocks, and technical content
                      </Typography>
                    </div>
                    <div className='space-y-1'>
                      <p className='font-mono font-normal text-sm text-gray-700 dark:text-gray-200'>Regular 400</p>
                      <p className='font-mono font-medium text-sm text-gray-700 dark:text-gray-200'>Medium 500</p>
                      <p className='font-mono font-bold text-sm text-gray-700 dark:text-gray-200'>Bold 700</p>
                    </div>
                  </div>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl p-6 '>
                  <Typography variant='h3' className='text-lg mb-2' noDefaultSize>
                    Secondary Font
                  </Typography>
                  <div className='space-y-3'>
                    <div>
                      <Typography variant='h4' className='text-2xl mb-1' noDefaultSize>
                        Roboto
                      </Typography>
                      <Typography variant='body' className='text-sm text-gray-600 dark:text-gray-300'>
                        Used for body text and general content
                      </Typography>
                    </div>
                    <div className='space-y-1'>
                      <p className='font-normal text-sm text-gray-700 dark:text-gray-200'>Regular 400</p>
                      <p className='font-medium text-sm text-gray-700 dark:text-gray-200'>Medium 500</p>
                      <p className='font-bold text-sm text-gray-700 dark:text-gray-200'>Bold 700</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Logos Section */}
        <section className='py-10 '>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#48df7b]/20 to-[#a679f0]/20'>
                  <FaImage className='text-xl text-[#a679f0]' />
                </div>
                <Typography variant='h2' className='text-3xl mt-3' noDefaultSize>
                  Logos
                </Typography>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {logos.map((logo) => (
                  <motion.div
                    key={logo.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: logos.indexOf(logo) * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden '
                  >
                    <div className='p-4 pb-2'>
                      <Typography variant='h4' className='text-base font-semibold' noDefaultSize>
                        {logo.name}
                      </Typography>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div>
                        <div className='h-28 flex items-center justify-center p-4' style={{ backgroundColor: '#2d2f56' }}>
                          <img src={logo.light} alt={`${logo.name} White`} className='max-h-full max-w-full object-contain' />
                        </div>
                        <a
                          href={logo.light}
                          download
                          className='flex items-center justify-center gap-1 px-3 py-2 text-white hover:text-white rounded-b-lg transition-all text-xs font-medium hover:bg-[#1f2142] active:bg-[#181a33]'
                          style={{ backgroundColor: '#2d2f56' }}
                        >
                          <FiDownload className='w-3 h-3 text-white' />
                          White
                        </a>
                      </div>
                      <div>
                        <div className='h-28 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-100'>
                          <img src={logo.dark || logo.light} alt={`${logo.name} Dark`} className='max-h-full max-w-full object-contain' />
                        </div>
                        <a
                          href={logo.dark || logo.light}
                          download
                          className='flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 text-gray-800 rounded-b-lg hover:bg-gray-300 transition-colors text-xs font-medium'
                        >
                          <FiDownload className='w-3 h-3' />
                          Dark
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className='py-10'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#a679f0]/20 to-[#5599fe]/20'>
                  <FaCode className='text-xl text-[#5599fe]' />
                </div>
                <Typography variant='h2' className='text-3xl mt-3' noDefaultSize>
                  Usage Guidelines
                </Typography>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-white dark:bg-gray-800 rounded-xl p-4 '>
                  <Typography variant='h3' className='text-lg mb-2 text-green-600' noDefaultSize>
                    ✓ Do's
                  </Typography>
                  <ul className='space-y-1.5'>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Use the official color palette for all branded materials</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Maintain proper contrast ratios for accessibility</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Use Roboto Mono for headings and technical content</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Provide adequate spacing around logos</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-green-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Use gradients consistently across materials</span>
                    </li>
                  </ul>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl p-6 '>
                  <Typography variant='h3' className='text-lg mb-2 text-red-600' noDefaultSize>
                    ✗ Don'ts
                  </Typography>
                  <ul className='space-y-1.5'>
                    <li className='flex items-center gap-2'>
                      <span className='text-red-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Don't alter the logo colors or proportions</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-red-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Don't use low-resolution versions of logos</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-red-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Don't create unofficial color variations</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-red-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Don't place logos on busy backgrounds</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-red-500'>•</span>
                      <span className='text-sm text-gray-700 dark:text-gray-200'>Don't mix brand fonts with non-approved typefaces</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='mt-8 p-4 bg-gradient-to-br from-[#5599fe]/10 to-[#48df7b]/10 rounded-xl'>
                <Typography variant='h3' className='text-sm font-semibold mb-2'>
                  Need Help?
                </Typography>
                <Typography variant='body' className='text-gray-600 dark:text-gray-300'>
                  For questions about brand usage or to request additional assets, please contact us at{' '}
                  <a href='mailto:brand@hashgraphonline.com' className='text-[#5599fe] hover:underline'>
                    brand@hashgraphonline.com
                  </a>
                </Typography>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BrandPage;